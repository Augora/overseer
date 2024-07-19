import React, { useEffect, useState } from 'react';
import { useQueries, UseQueryResult } from 'react-query';
import { GetWorkflows } from '../../lib/github/Workflows';
import Spinner from '../common/Spinner';
import GitHubWorkflowCard from './GitHubWorkflowCard';
import orderBy from 'lodash/orderBy';

interface IGitHubWorkflowHandlerProps {
  githubToken: string;
  repositoriesName: string[];
}

interface EnhancedWorkflowRun extends Types.External.WorkflowRun {
  parentReactQuery: UseQueryResult;
}

function orderWorkflows(
  queries: UseQueryResult<Types.External.GitHubWorkflows, unknown>[],
): EnhancedWorkflowRun[] {
  return orderBy(
    queries.flatMap((q) =>
      q.data.workflow_runs.map((run) => Object.assign({}, run, { parentReactQuery: q })),
    ),
    'created_at',
    'desc',
  );
}

export default function GitHubWorkflowHandler(props: IGitHubWorkflowHandlerProps) {
  const [workflows, setWorkflows] = useState<EnhancedWorkflowRun[]>([]);
  const queries = useQueries(
    props.repositoriesName.map((repositoryName) => ({
      queryKey: ['github-repos', repositoryName],
      queryFn: () => GetWorkflows(props.githubToken, repositoryName),
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    })),
  );

  useEffect(() => {
    if (!queries.some((q) => q.isLoading)) {
      setWorkflows(orderWorkflows(queries));
    }
  }, [queries.some((q) => q.isLoading)]);

  return queries.some((q) => q.isLoading) ? (
    <div className="flex min-h-[250px] items-center justify-center">
      <Spinner color="teal" size="lg" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {workflows.map((run) => {
        return <GitHubWorkflowCard key={run.id} {...run} githubToken={props.githubToken} />;
      })}
    </div>
  );
}
