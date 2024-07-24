'use server';

import { GetSession } from '@/lib/supabase/GetSession';
import GitHubWorkflowGrid from '../../components/github-actions/GitHubWorkflowGrid';

export default async function Page() {
  const session = await GetSession();

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

  return <GitHubWorkflowGrid githubToken={session.provider_token} />;
}
