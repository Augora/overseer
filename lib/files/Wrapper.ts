import axios from 'axios';
import { BlobItem } from '@azure/storage-blob';

export function ListFiles() {
  return axios.get<BlobItem[]>('/api/file').then((d) => d.data);
}

export function CreateFile(name: string, content: string) {
  return axios
    .post('/api/file', {
      name,
      content,
    })
    .then((d) => d.data);
}

export async function RemoveFile(name: string) {
  return axios
    .request({
      url: '/api/file',
      method: 'DELETE',
      data: {
        name,
      },
    })
    .then((d) => d.data);
}
