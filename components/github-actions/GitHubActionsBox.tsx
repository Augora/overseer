import React from 'react';
import { Box, Badge, Link } from '@chakra-ui/core';
import moment from 'moment';

interface IGitHubActionsBoxProps {
  status: string;
  htmlUrl: string;
  createdAt: string;
  branch: string;
  conclusion: string;
}

export default function GitHubActionsBox(props: IGitHubActionsBoxProps) {
  return (
    <Box borderWidth="1px" rounded="lg" minW="200px">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge
            rounded="full"
            px="2"
            bg={
              props.conclusion === 'success'
                ? 'green.300'
                : props.conclusion === 'failure'
                ? 'red.300'
                : 'orange.300'
            }
            color="gray.700"
          >
            {props.status === 'completed' ? props.conclusion : props.status}
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {props.branch}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm">
          {moment(props.createdAt).fromNow()}
        </Box>
      </Box>
    </Box>
  );
}
