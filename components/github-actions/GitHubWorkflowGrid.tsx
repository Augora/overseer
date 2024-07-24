'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GitHubWorkflowHandler from './GitHubWorkflowHandler';

const queryClient = new QueryClient();

interface IGitHubWorkflowGridProps {
  githubToken: string;
}

export default function GitHubWorkflowGrid(props: IGitHubWorkflowGridProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubWorkflowHandler
        repositoriesName={['Augora', 'Overseer', 'Nucleus']}
        githubToken={props.githubToken}
      />
    </QueryClientProvider>
  );
}
