import { SimpleGrid } from '@chakra-ui/core';
import React from 'react';
import GitHubWorkflowHandler from './GitHubWorkflowHandler';

interface IGitHubWorkflowGridProps {
  githubToken: string;
}

export default function GitHubWorkflowGrid(props: IGitHubWorkflowGridProps) {
  return (
    <SimpleGrid minChildWidth="450px" spacing="40px">
      <GitHubWorkflowHandler repositoryName="Augora" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Overseer" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Nucleus" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Convey" githubToken={props.githubToken} />
    </SimpleGrid>
  );
}
