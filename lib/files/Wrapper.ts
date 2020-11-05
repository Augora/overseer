import axios from 'axios';

export function ListFiles() {
  return axios.get('/api/file').then((d) => d.data);
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
