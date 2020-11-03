import { NowRequest, NowResponse } from '@vercel/node';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

function getBlobFromAzureStorage(blobName: string) {
  const containerName = 'images';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);
  return blobClient.download();
}

function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}

function parseQuery(str: string | string[]) {
  if (Array.isArray(str)) {
    return str[0];
  }
  return str;
}

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === 'GET') {
    const blobContent = await getBlobFromAzureStorage(parseQuery(req.query.filename));
    const blobContentAsBuffer = await streamToBuffer(blobContent.readableStreamBody);
    res.status(200);
    res.setHeader('Content-Type', blobContent.contentType);
    res.setHeader(
      'Cache-Control',
      blobContent.cacheControl || 's-maxage=3600, stale-while-revalidate'
    );
    res.setHeader('eTag', blobContent.etag);
    return res.send(blobContentAsBuffer);
  }
  return res.status(404).end();
};
