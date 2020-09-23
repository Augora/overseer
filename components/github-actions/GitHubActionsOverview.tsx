import React from 'react';
import { Heading, Divider, Stack, Skeleton, Box, Spinner } from '@chakra-ui/core';

import GitHubActionsBox from './GitHubActionsBox';
import { GetWorkflows } from '../../lib/github/Workflows';
import { useQuery } from 'react-query';

export default function GitHubActionsOverview({ RepositoryName }) {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    `${RepositoryName}-workflows`,
    () => GetWorkflows(RepositoryName),
    { refetchInterval: 10000 }
  );

  return (
    <>
      <Heading m="0" pl="10">
        {RepositoryName} {isFetching ? <Spinner /> : null}
      </Heading>
      <Divider ml="6" mr="6" />
      <Skeleton isLoaded={!isLoading}>
        <Stack direction="row" overflowX="scroll">
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
