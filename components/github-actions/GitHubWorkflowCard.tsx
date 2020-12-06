import React from 'react';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import { FaSync, FaArrowRight } from 'react-icons/fa';
import { ScaleFade } from '@chakra-ui/transition';

interface IGitHubWorkflowCardProps {
  repositoryName: string;
  repositoryUrl: string;
  lastRunStatus: string;
  branchName: string;
  createdAt: string;
  isFetching: boolean;
  logsUrl: string;
  refetch: Function;
}

export default function GitHubWorkflowCard(props: IGitHubWorkflowCardProps) {
  const { colorMode } = useColorMode();
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Box
        borderRadius="5px"
        minHeight="250px"
        p="5"
        width="100%"
        bg={colorMode === 'light' ? 'gray.400' : 'gray.900'}
        transition="background-color cubic-bezier(1, 0, 0, 1) 200ms"
        _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.700' }}
      >
        <Flex justifyContent="space-between">
          <Box>
            <Heading size="lg">
              <Link href={props.repositoryUrl} target="_blank" mr="10px">
                {props.repositoryName}
              </Link>
              <Badge
                p="5px"
                rounded="5px"
                mr="10px"
                colorScheme={
                  props.lastRunStatus === 'success'
                    ? 'green'
                    : props.lastRunStatus === 'failure'
                    ? 'red'
                    : 'orange'
                }
              >
                {props.lastRunStatus}
              </Badge>
            </Heading>
          </Box>
          <IconButton
            aria-label="Refresh"
            icon={props.isFetching ? <Spinner size="sm" /> : <FaSync />}
            onClick={() => props.refetch()}
            isDisabled={props.isFetching}
          />
        </Flex>

        <Text my="2">{props.branchName}</Text>

        <Text my="2" color="gray.500" fontSize="sm">
          {formatDistanceToNow(parseJSON(props.createdAt))}
        </Text>

        <Box my="4" display="flex" justifyContent="start" alignItems="center">
          <Button
            rightIcon={<FaArrowRight />}
            colorScheme="teal"
            variant="outline"
            mr="20px"
            onClick={() => window.open(props.logsUrl, '_blank')}
          >
            <Text>Logs</Text>
          </Button>
        </Box>
      </Box>
    </ScaleFade>
  );
}
