import { Endpoints } from '@octokit/types';
import axios from 'axios';

type ActionsRunsResponse = Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data'];
type JobsResponse =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs']['response']['data'];

export function GetActionsRuns(token: string, repoName: string): Promise<ActionsRunsResponse> {
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
  workflowId: string,
): Promise<JobsResponse> {
  return axios
    .get(`https://api.github.com/repos/Augora/${reposName}/actions/runs/${workflowId}/jobs`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((d) => d.data);
}
