import React from 'react';
import { Heading, Divider, Stack } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';

import GitHubActionsBox from './GitHubActionsBox';
import { GetWorkflows } from '../../lib/github/Workflows';
import { useQuery } from 'react-query';

export default function GitHubActionsOverview({ RepositoryName }) {
  const [session] = useSession();
  const { isLoading, isError, data, error } = useQuery(`${RepositoryName}-workflows`, () =>
    GetWorkflows(RepositoryName)
  );

  return (
    <>
      <Heading pl="10" mb="0">
        {RepositoryName}
      </Heading>
      <Divider ml="6" mr="6" />
      {isLoading ? (
        'Loading...'
      ) : (
        <Stack isInline direction="row" overflow="scroll">
          {data.workflow_runs.map((wd) => (
            <GitHubActionsBox
              key={wd.id}
              createdAt={wd.created_at}
              branch={wd.head_branch}
              status={wd.status}
              conclusion={wd.conclusion}
              htmlUrl={wd.html_url}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
