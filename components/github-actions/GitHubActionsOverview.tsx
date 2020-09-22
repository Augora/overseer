import React from 'react';
import { Heading, Divider, Stack, Skeleton, Box, Spinner } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';

import GitHubActionsBox from './GitHubActionsBox';
import { GetWorkflows } from '../../lib/github/Workflows';
import { useQuery } from 'react-query';

export default function GitHubActionsOverview({ RepositoryName }) {
  const [session] = useSession();
  const { isLoading, isError, data, error, isFetching } = useQuery(
    `${RepositoryName}-workflows`,
    () => GetWorkflows(RepositoryName),
    { refetchInterval: 10000 }
  );

  return (
    <>
      <Heading pl="10" mb="0">
        {RepositoryName} {isFetching && <Spinner />}
      </Heading>
      <Divider ml="6" mr="6" />
      <Skeleton isLoaded={!isLoading}>
        <Stack isInline direction="row" overflow="scroll" height="100px">
          {data &&
            data.workflow_runs.map((wd) => (
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
      </Skeleton>
    </>
  );
}
