import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import GitHubWorkflowHandler from './GitHubWorkflowHandler';

interface IGitHubWorkflowGridProps {
  githubToken: string;
}

export default function GitHubWorkflowGrid(props: IGitHubWorkflowGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <GitHubWorkflowHandler repositoryName="Augora" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Overseer" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Nucleus" githubToken={props.githubToken} />
      <GitHubWorkflowHandler repositoryName="Convey" githubToken={props.githubToken} />
    </div>
  );
}
