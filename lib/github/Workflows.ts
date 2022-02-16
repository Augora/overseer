import axios from 'axios';

export function GetWorkflows(
  token: string,
  repoName: string
): Promise<Types.External.GitHubWorkflows> {
  return axios
    .get(`https://api.github.com/repos/Augora/${repoName}/actions/runs`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((d) => d.data);
}

export function GetJobs(
  token: string,
  reposName: string,
  workflowId: string
): Promise<Types.External.GitHubJobs> {
  return axios
    .get(`https://api.github.com/repos/Augora/${reposName}/actions/runs/${workflowId}/jobs`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((d) => d.data);
}
