import axios from 'axios';

export function GetWorkflows(repoName: string) {
  return axios
    .get(`https://api.github.com/repos/Augora/${repoName}/actions/runs`)
    .then((d) => d.data);
}
