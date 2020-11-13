import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import GitHubWorkflowHandler from './GitHubWorkflowHandler';

interface IGitHubWorkflowGridProps {
  githubToken: string;
}

export default function GitHubWorkflowGrid(props: IGitHubWorkflowGridProps) {
  return (
    <SimpleGrid minChildWidth={{ base: 300, sm: 450 }} spacing="40px">
      <GitHubWorkflowHandler repositoryName="Augora" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Overseer" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Nucleus" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Convey" githubToken={props.githubToken} />
    </SimpleGrid>
  );
}
