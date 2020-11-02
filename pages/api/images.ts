import { NowRequest, NowResponse } from "@vercel/node";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

import mime from "mime-types";

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerClient = blobServiceClient.getContainerClient("images");

function uploadBlobOnAzureStorage(blobname: string, blobContent: string) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobname);
  return blockBlobClient.upload(blobContent, blobContent.length, {
    blobHTTPHeaders: {
      blobContentType: mime.lookup(blobname),
    },
  });
}

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

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === "GET") {
    const list = await listBlobOnAzureStorage();
    return res.status(200).json(list);
  } else if (req.method === "POST" || req.method === "PUT") {
    const name = req.body.name;
    const content = req.body.content;

    try {
      await uploadBlobOnAzureStorage(name, content);
    } catch (err) {
      return res.status(500).json(err);
    }
    return res.status(204).end();
  } else if (req.method === "DELETE") {
  }
  return res.status(200).json({ lel: "mdr" });
};
