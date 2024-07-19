'use client';

import React, { useEffect, useState } from 'react';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import orderBy from 'lodash/orderBy';
import { Spinner } from '@nextui-org/react';

import GitHubWorkflowCard from './GitHubWorkflowCard';
import { GetWorkflows } from '../../lib/github/Workflows';

interface IGitHubWorkflowHandlerProps {
  githubToken: string;
  repositoriesName: string[];
}

interface EnhancedWorkflowRun extends Types.External.WorkflowRun {
  parentReactQuery: Types.External.GitHubWorkflows;
}

function orderWorkflows(
  queries: UseQueryResult<Types.External.GitHubWorkflows, unknown>[],
): EnhancedWorkflowRun[] {
  return orderBy(
    queries.flatMap(
      (q) =>
        q.data?.workflow_runs.map((run) => Object.assign({}, run, { parentReactQuery: q.data })) ||
        [],
    ),
    'created_at',
    'desc',
  );
}

export default function GitHubWorkflowHandler(props: IGitHubWorkflowHandlerProps) {
  const [workflows, setWorkflows] = useState<EnhancedWorkflowRun[]>([]);
  const queries = useQueries({
    queries: props.repositoriesName.map((repositoryName) => ({
      queryKey: ['github-repos', repositoryName],
      queryFn: () => GetWorkflows(props.githubToken, repositoryName),
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    })),
  });

  useEffect(() => {
    if (!queries.some((q) => q.isLoading)) {
      setWorkflows(orderWorkflows(queries));
    }
  }, [queries.some((q) => q.isLoading)]);

  return queries.some((q) => q.isLoading) ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="lg" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {workflows.map((run) => {
        return <GitHubWorkflowCard key={run.id} {...run} githubToken={props.githubToken} />;
      })}
    </div>
  );
}
