import axios from 'axios';

export function ListFiles() {
  return axios.get(`/api/files`).then((d) => d.data);
}
