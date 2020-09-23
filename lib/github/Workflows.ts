import axios from 'axios';

export function GetWorkflows(token: string, repoName: string) {
  return axios
    .get(`https://api.github.com/repos/Augora/${repoName}/actions/runs`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((d) => d.data);
}
