import axios from 'axios';
import { BlobItem } from '@azure/storage-blob';

export function ListFiles() {
  return axios.get<BlobItem[]>('/api/file').then((d) => d.data);
}

export function CreateFile(name: string, content: string) {
  // const base64Content = btoa(content);
  return axios
    .post('/api/file', {
      name,
      content,
    })
    .then((d) => d.data);
}
