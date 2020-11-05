import axios from 'axios';

export function ListFiles() {
  return axios.get(`/api/files`).then((d) => d.data);
}

export function CreateFile(name: string, content: string) {
  return axios
    .post(`/api/files`, {
      name,
      content,
    })
    .then((d) => d.data);
}
