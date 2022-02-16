import React from 'react';
import { Box, Button, Heading, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import { ImCross } from 'react-icons/im';
import { FaSync, FaCheck, FaSlash, FaCog } from 'react-icons/fa';
import { useQuery, UseQueryResult } from 'react-query';
import { GetJobs } from '../../lib/github/Workflows';
import Spinner from '../common/Spinner';

interface EnhancedWorkflowRun extends Types.External.WorkflowRun {
  parentReactQuery: UseQueryResult;
}

interface IGitHubWorkflowCardProps extends EnhancedWorkflowRun {
  githubToken: string;
}

const statusToBg = {
  success: 'bg-teal-600',
  failure: 'bg-red-600',
  in_progress: '',
};

const jobStatusToBg = {
  cancelled: 'bg-gray-500',
  success: 'bg-green-500',
  failure: 'bg-red-500',
  in_progress: 'bg-yellow-500',
  skipped: 'bg-gray-500',
};

export default function GitHubWorkflowCard(props: IGitHubWorkflowCardProps) {
  const { data, isLoading } = useQuery(['github-jobs', props.repository.name, props.id], () =>
    GetJobs(props.githubToken, props.repository.name, props.id.toString())
  );

  return (
    <div className="rounded-md p-5 bg-gray-900 hover:bg-gray-700 transition-colors ease-out delay-100">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Link href={props.repository.html_url}>
            <a className="flex flex-col text-3xl font-bold hover:underline hover:underline-offset-2">
              {props.repository.name}
            </a>
          </Link>
          <span
            className={`items-center justify-center h-6 mx-2 my-2 px-2 py-1 text-sm leading-none ${
              statusToBg[props.conclusion]
            } rounded`}
          >
            {props.conclusion}
          </span>
        </div>
        <IconButton
          aria-label="Refresh"
          icon={props.parentReactQuery.isFetching ? <Spinner size="sm" color="gray" /> : <FaSync />}
          onClick={() => props.parentReactQuery.refetch()}
          isDisabled={props.parentReactQuery.isFetching}
        />
      </div>

      <div className="text-mg my-2">{props.head_branch}</div>

      <div className="text-mg text-gray-500 my-2">
        {formatDistanceToNow(parseJSON(props.created_at))}
      </div>

      {isLoading ? (
        <div className="flex min-h-[50px] items-center justify-center">
          <Spinner color="teal" size="md" />
        </div>
      ) : (
        <div className="flex space-x-2">
          {data.jobs.map((j) => {
            const currentStatus = j.status === 'completed' ? j.conclusion : j.status;
            return (
              <div
                className={`relative has-tooltip rounded-full w-6 h-6 ${jobStatusToBg[currentStatus]} p-1.5`}
              >
                {currentStatus === 'cancelled' && <FaSlash fontSize={12} />}
                {currentStatus === 'in_progress' && <FaCog fontSize={12} />}
                {currentStatus === 'failure' && <ImCross fontSize={12} />}
                {currentStatus === 'success' && <FaCheck fontSize={12} />}
                {currentStatus === 'skipped' && <FaSlash fontSize={12} />}
                <span className="tooltip absolute top-3/4 left-1/2 opacity-0 bg-gray-500 rounded px-4 py-2 min-w-max transition-all">
                  {j.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
