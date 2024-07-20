import React from 'react';
import GitHubWorkflowHandler from './GitHubWorkflowHandler';

interface IGitHubWorkflowGridProps {
  githubToken: string;
}

export default function GitHubWorkflowGrid(props: IGitHubWorkflowGridProps) {
  return (
    <GitHubWorkflowHandler
      repositoriesName={['Augora', 'Overseer', 'Nucleus']}
      githubToken={props.githubToken}
    />
  );
}
