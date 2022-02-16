import React from 'react';
import { useQuery } from 'react-query';
import { GetWorkflows } from '../../lib/github/Workflows';
import Spinner from '../common/Spinner';
import GitHubWorkflowCard from './GitHubWorkflowCard';

interface IGitHubWorkflowHandlerProps {
  githubToken: string;
  repositoryName: string;
}

export default function GitHubWorkflowHandler(props: IGitHubWorkflowHandlerProps) {
  const { isLoading, data, isFetching, refetch } = useQuery(
    `${props.repositoryName}-workflows`,
    () => GetWorkflows(props.githubToken, props.repositoryName),
    {
      refetchInterval: 10000,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const latestWorkflow = data ? data.workflow_runs[0] : null;

  return isLoading ? (
    <div className="flex min-h-[250px] items-center justify-center">
      <Spinner color="teal" size="lg" />
    </div>
  ) : (
    <GitHubWorkflowCard
      repositoryName={props.repositoryName}
      repositoryUrl={latestWorkflow.repository.html_url}
      logsUrl={`${latestWorkflow.repository.html_url}/actions/runs/${latestWorkflow.id}`}
      lastRunStatus={latestWorkflow.conclusion ? latestWorkflow.conclusion : latestWorkflow.status}
      branchName={latestWorkflow.head_branch}
      createdAt={latestWorkflow.updated_at}
      isFetching={isFetching}
      refetch={refetch}
    />
  );
}
