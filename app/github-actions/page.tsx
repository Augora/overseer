'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GitHubWorkflowGrid from '../../components/github-actions/GitHubWorkflowGrid';
import useSupabaseSession from '../../lib/react-custom-hooks/useSupabaseSession';

const queryClient = new QueryClient();

export default function Page() {
  const session = useSupabaseSession();

  if (session === null) {
    return (
      <span className="flex justify-center items-center h-screen text-red-500 text-4xl">
        {'You must log in first.'}
      </span>
    );
  }

  if (session.provider_token === null || session.provider_token === undefined) {
    return (
      <span className="flex justify-center items-center h-screen text-red-500 text-4xl">
        {'Something wrong happened, please ty again later.'}
      </span>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GitHubWorkflowGrid githubToken={session.provider_token} />
    </QueryClientProvider>
  );
}
