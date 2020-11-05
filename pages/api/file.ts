import { NowRequest, NowResponse } from '@vercel/node';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { getSession } from 'next-auth/client';

import mime from 'mime-types';

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerClient = blobServiceClient.getContainerClient('images');

async function listBlobOnAzureStorage() {
  let iter = containerClient.listBlobsFlat({
    includeMetadata: true,
    includeTags: true,
  });
  let blobItem = await iter.next();
  let res = new Array();
  while (!blobItem.done) {
    res.push(blobItem.value);
    blobItem = await iter.next();
  }
  return res;
}

function uploadBlobOnAzureStorage(blobname: string, blobContent: string) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobname);
  return blockBlobClient.upload(blobContent, blobContent.length, {
    blobHTTPHeaders: {
      blobContentType: mime.lookup(blobname),
    },
  });
}

function deleteBlobOnAzureStorage(blobname: string) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobname);
  return blockBlobClient.delete();
}

enum EOPERATION {
  CREATE,
  READ,
  UPDATE,
  DELETE,
  ERROR,
}

interface IBody {
  name?: string;
  content?: string;
}

interface IProcessType {
  operation: EOPERATION;
  body?: IBody;
  errorMessage?: string;
}

function parseRequest(session, req: NowRequest): IProcessType {
  if (!session) {
    return {
      operation: EOPERATION.ERROR,
      errorMessage: 'You should be authenticated to access this ressource.',
    };
  }

  if (req.method.toUpperCase() === 'GET') {
    return {
      operation: EOPERATION.READ,
    };
  } else if (req.method.toUpperCase() === 'POST' || req.method.toUpperCase() === 'PUT') {
    const name = req.body.name;
    const content = req.body.content;
    if (name && content) {
      return {
        operation: req.method.toUpperCase() === 'POST' ? EOPERATION.CREATE : EOPERATION.UPDATE,
        body: {
          name,
          content,
        },
      };
    } else {
      return {
        operation: EOPERATION.ERROR,
        errorMessage: `${req.method.toUpperCase()} method should have name and content properties in body.`,
      };
    }
  } else if (req.method.toUpperCase() === 'DELETE') {
    const name = req.body.name;
    if (name) {
      return {
        operation: EOPERATION.DELETE,
        body: {
          name,
        },
      };
    } else {
      return {
        operation: EOPERATION.ERROR,
        errorMessage: `DELETE method should have a name property in body.`,
      };
    }
  } else {
    return {
      operation: EOPERATION.ERROR,
      errorMessage: `This method is not authorized. Please use GET/POST/PUT/DELETE.`,
    };
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const session = await getSession({ req });
  const reqToProcess = parseRequest(session, req);

  if (reqToProcess.operation === EOPERATION.READ) {
    const list = await listBlobOnAzureStorage();
    return res.status(200).json(list);
  } else if (
    reqToProcess.operation === EOPERATION.CREATE ||
    reqToProcess.operation === EOPERATION.UPDATE
  ) {
    const name = reqToProcess.body.name;
    const content = reqToProcess.body.content;

    try {
      const uploadedItem = await uploadBlobOnAzureStorage(name, content);
      return res.status(uploadedItem._response.status).json(uploadedItem);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (reqToProcess.operation === EOPERATION.DELETE) {
    const name = reqToProcess.body.name;
    const deletedItem = await deleteBlobOnAzureStorage(name);
    return res.status(deletedItem._response.status).json(deletedItem);
  } else if (reqToProcess.operation === EOPERATION.ERROR) {
    return res.status(400).json({
      errorMessage: reqToProcess.errorMessage,
    });
  }
  return res.status(400).end();
};
