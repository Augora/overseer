'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow, parseJSON, formatRelative } from 'date-fns';
import { ImCross } from 'react-icons/im';
import { FaCheck, FaSlash, FaCodeBranch, FaClock, FaSpinner } from 'react-icons/fa';
import { Button, Card, Chip, Progress, Spacer, Tooltip } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from '@octokit/types';
import { CgNotes } from 'react-icons/cg';

import { GetJobs } from '../../lib/github/Workflows';

type WorkflowRun =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data']['workflow_runs'][0];

interface IGitHubWorkflowCardProps extends WorkflowRun {
  githubToken: string;
}

const jobStatusToColor = {
  cancelled: 'default',
  success: 'success',
  failure: 'danger',
  in_progress: 'warning',
  skipped: 'default',
};

export default function GitHubWorkflowCard(props: IGitHubWorkflowCardProps) {
  const { data, dataUpdatedAt, isLoading, isFetching } = useQuery({
    queryKey: ['github-jobs', props.repository.name, props.id],
    queryFn: () => GetJobs(props.githubToken, props.repository.name, props.id.toString()),
    refetchInterval: (data) =>
      data.state.data?.jobs.some((j) => j.status !== 'completed') ? 30000 : false,
    refetchOnWindowFocus: (data) =>
      data.state.data?.jobs.some((j) => j.status !== 'completed') ?? false,
    refetchIntervalInBackground: false,
  });

  return (
    <Card isPressable className="p-4 min-h-40 cursor-default">
      {isLoading || isFetching ? (
        <>
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md relative bottom-2"
          />
        </>
      ) : (
        <>
          <Progress size="sm" isIndeterminate aria-label="Loading..." className="invisible" />
        </>
      )}
      <div className="flex justify-between flex-row w-full">
        <span>
          <Link
            href={props.repository.html_url}
            className="text-xl font-bold hover:underline hover:underline-offset-2"
            target="_blank"
          >
            {props.repository.name}
          </Link>
        </span>
        <Tooltip content={`Last refresh: ${formatRelative(dataUpdatedAt, new Date())}`}>
          <Chip
            color={
              props.status === 'in_progress'
                ? 'warning'
                : props.conclusion === 'success'
                  ? 'success'
                  : 'danger'
            }
          >
            {props.status === 'in_progress'
              ? 'In progress'
              : props.conclusion === 'success'
                ? 'Success'
                : 'Error'}
          </Chip>
        </Tooltip>
      </div>

      <Spacer y={4} />

      <Link
        href={`${props.repository.html_url}/tree/${props.head_branch}`}
        className="flex hover:underline hover:underline-offset-2"
        target="_blank"
      >
        <FaCodeBranch />
        <Spacer x={2} />
        <div className="text-mg">{props.head_branch}</div>
      </Link>

      <Spacer y={1} />

      <div className="flex">
        <FaClock />
        <Spacer x={2} />
        <div className="text-mg text-gray-500">
          {formatDistanceToNow(parseJSON(props.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </div>
      </div>

      <Spacer y={1} />

      <Link
        href={`${props.repository.html_url}/actions/runs/${props.id}`}
        className="flex hover:underline hover:underline-offset-2"
      >
        <CgNotes />
        <Spacer x={2} />
        <div className="text-mg text-gray-500">Logs</div>
      </Link>

      <Spacer y={4} />

      <div className="flex justify-between flex-row gap-2">
        {data?.jobs.map((j) => {
          const currentStatus = j.status === 'completed' ? j.conclusion : j.status;
          if (currentStatus === null) return null;

          return (
            <Tooltip content={j.name} key={j.id}>
              <Link
                href={`${props.repository.html_url}/actions/runs/${props.id}/job/${j.id}`}
                className="flex hover:underline hover:underline-offset-2"
                target="_blank"
              >
                <Button color={jobStatusToColor[currentStatus]} isIconOnly>
                  {currentStatus === 'cancelled' && <FaSlash fontSize={12} />}
                  {currentStatus === 'in_progress' && (
                    <FaSpinner className="animate-spinner-ease-spin" fontSize={12} />
                  )}
                  {currentStatus === 'failure' && <ImCross fontSize={12} />}
                  {currentStatus === 'success' && <FaCheck fontSize={12} />}
                  {currentStatus === 'skipped' && <FaSlash fontSize={12} />}
                </Button>
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </Card>
  );
}
