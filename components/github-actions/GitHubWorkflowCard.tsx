'use client';

import { Button, Card, Chip, Progress, Spacer, Tooltip } from '@nextui-org/react';
import { Endpoints } from '@octokit/types';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow, formatRelative, parseJSON } from 'date-fns';
import Link from 'next/link';
import { CgNotes } from 'react-icons/cg';
import {
  FaBan,
  FaCheck,
  FaClock,
  FaCodeBranch,
  FaExclamationCircle,
  FaSlash,
  FaSpinner,
} from 'react-icons/fa';
import { GoWorkflow } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { GetJobs } from '../../lib/github/Workflows';

type WorkflowRun =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data']['workflow_runs'][0];

interface IGitHubWorkflowCardProps {
  githubToken: string;
  workflowDetails: WorkflowRun;
}

export default function GitHubWorkflowCard(props: IGitHubWorkflowCardProps) {
  const { data, dataUpdatedAt, isLoading, isFetching } = useQuery({
    queryKey: ['github-jobs', props.workflowDetails.repository.name, props.workflowDetails.id],
    queryFn: () =>
      GetJobs(
        props.githubToken,
        props.workflowDetails.repository.name,
        props.workflowDetails.id.toString(),
      ),
    refetchInterval: (data) =>
      data.state.data?.jobs.some((j) => j.status !== 'completed') ? 30000 : false,
    refetchOnWindowFocus: (data) =>
      data.state.data?.jobs.some((j) => j.status !== 'completed') ?? false,
    refetchIntervalInBackground: false,
  });

  var workflowCurrentStatus =
    (props.workflowDetails.status === 'completed'
      ? props.workflowDetails.conclusion
      : props.workflowDetails.status) ?? 'neutral';

  return (
    <Card isPressable className="p-4 min-h-64 cursor-default">
      {isLoading || isFetching ? (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md relative bottom-2"
        />
      ) : (
        <Progress size="sm" isIndeterminate aria-label="Loading..." className="invisible" />
      )}
      <div className="flex items-center justify-between flex-row w-full">
        <span>
          <Link
            href={props.workflowDetails.html_url}
            className="text-xl font-bold hover:underline hover:underline-offset-2"
            target="_blank"
          >
            {props.workflowDetails.repository.name}
          </Link>
        </span>
        <Tooltip content={`Last refresh: ${formatRelative(dataUpdatedAt, new Date())}`}>
          <Chip color={statusToColor(workflowCurrentStatus)}>
            {formatString(workflowCurrentStatus)}
          </Chip>
        </Tooltip>
      </div>

      <Spacer y={4} />

      <div className="flex items-center">
        <GoWorkflow />
        <Spacer x={2} />
        <div className="text-mg text-gray-500">{props.workflowDetails.name}</div>
      </div>

      <Spacer y={1} />

      <div className="flex items-center">
        <FaClock />
        <Spacer x={2} />
        <div className="text-mg text-gray-500">
          {formatDistanceToNow(parseJSON(props.workflowDetails.created_at), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </div>
      </div>

      <Spacer y={1} />

      <Link
        href={`${props.workflowDetails.html_url}/tree/${props.workflowDetails.head_branch}`}
        className="flex items-center hover:underline hover:underline-offset-2  "
        target="_blank"
      >
        <FaCodeBranch />
        <Spacer x={2} />
        <div className="text-mg text-nowrap">{props.workflowDetails.head_branch}</div>
      </Link>

      <Spacer y={1} />

      <Link
        href={props.workflowDetails.html_url}
        className="flex items-center hover:underline hover:underline-offset-2"
        target="_blank"
      >
        <CgNotes />
        <Spacer x={2} />
        <div className="text-mg">Logs</div>
      </Link>

      <Spacer y={4} />

      <div className="flex justify-between flex-row gap-2">
        {data?.jobs.map((j) => {
          const jobCurrentStatus = j.status === 'completed' ? j.conclusion : j.status;
          if (jobCurrentStatus === null) return null;

          return (
            <Tooltip content={j.name} key={j.id}>
              <Link
                href={j.html_url ?? ''}
                className="flex hover:underline hover:underline-offset-2"
                target="_blank"
              >
                <Button color={statusToColor(jobCurrentStatus)} isIconOnly>
                  {statusToReactIcon(jobCurrentStatus)}
                </Button>
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </Card>
  );
}

function formatString(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

function statusToColor(status: string) {
  switch (status) {
    case 'cancelled':
      return 'default';
    case 'success':
      return 'success';
    case 'failure':
      return 'danger';
    case 'in_progress':
      return 'warning';
    case 'skipped':
      return 'default';
    case 'queued':
      return 'warning';
    case 'neutral':
      return 'default';
    case 'timed_out':
      return 'danger';
    case 'action_required':
      return 'warning';
    case 'stale':
      return 'warning';
    case 'requested':
      return 'warning';
    default:
      return 'default';
  }
}

function statusToReactIcon(status: string) {
  switch (status) {
    case 'cancelled':
      return <FaSlash />;
    case 'queued':
      return <FaClock />;
    case 'neutral':
      return <FaBan />;
    case 'timed_out':
      return <FaClock />;
    case 'action_required':
      return <FaExclamationCircle />;
    case 'stale':
      return <FaClock />;
    case 'requested':
      return <FaClock />;
    case 'in_progress':
      return <FaSpinner className="animate-spinner-ease-spin" />;
    case 'failure':
      return <ImCross />;
    case 'success':
      return <FaCheck />;
    case 'skipped':
      return <FaSlash />;
    default:
      return null;
  }
}
