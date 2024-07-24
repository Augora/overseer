'use client';

import { Spinner } from '@nextui-org/react';
import { Endpoints } from '@octokit/types';
import { useQueries } from '@tanstack/react-query';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';

import { GetActionsRuns } from '../../lib/github/Workflows';
import GitHubWorkflowCard from './GitHubWorkflowCard';

type WorkflowRuns =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data']['workflow_runs'][0];

interface IGitHubWorkflowHandlerProps {
  githubToken: string;
  repositoriesName: string[];
}

export default function GitHubWorkflowHandler(props: IGitHubWorkflowHandlerProps) {
  const [workflows, setWorkflows] = useState<WorkflowRuns[]>([]);

  const queries = useQueries({
    queries: props.repositoriesName.map((repositoryName) => ({
      queryKey: ['github-repos', repositoryName],
      queryFn: () => GetActionsRuns(props.githubToken, repositoryName),
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    })),
  });

  useEffect(() => {
    if (!queries.some((q) => q.isLoading)) {
      setWorkflows(
        orderBy(
          queries.map((q) => q.data?.workflow_runs).flat() as WorkflowRuns[],
          'created_at',
          'desc',
        ),
      );
    }
  }, [queries.some((q) => q.isLoading || q.isFetching)]);

  return queries.some((q) => q.isLoading) ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="lg" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {workflows.map((run) => {
        return (
          <GitHubWorkflowCard key={run.id} workflowDetails={run} githubToken={props.githubToken} />
        );
      })}
    </div>
  );
}
