import React from 'react';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/core';
import moment from 'moment';
import { FaCaretDown, FaArrowRight } from 'react-icons/fa';

interface IGitHubWorkflowCardProps {
  repositoryName: string;
  repositoryUrl: string;
  lastRunStatus: string;
  branchName: string;
  createdAt: string;
  isFetching: boolean;
  logsUrl: string;
  refreshDataFunction?: Function;
  manualProductionFunction?: Function;
  manualStagingFunction?: Function;
}

export default function GitHubWorkflowCard(props: IGitHubWorkflowCardProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRadius="5px"
      minHeight="250px"
      p="5"
      width="100%"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      transition="background-color cubic-bezier(1, 0, 0, 1) 250ms"
      _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.700' }}
    >
      <Flex justifyContent="space-between">
        <Box>
          <Heading size="lg">
            <Link href={props.repositoryUrl} target="_blank" mr="10px">
              {props.repositoryName}
            </Link>
            <Badge
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
            {props.isFetching && <Spinner />}
          </Heading>
        </Box>
        {props.manualProductionFunction ||
        props.manualStagingFunction ||
        props.refreshDataFunction ? (
          <Menu>
            <MenuButton as={Button}>
              <FaCaretDown style={{ height: '100%' }} />
            </MenuButton>
            <MenuList p="0">
              {props.manualProductionFunction && (
                <MenuItem border="none" onClick={() => props.manualProductionFunction()}>
                  Trigger production workflow
                </MenuItem>
              )}
              {props.manualStagingFunction && (
                <MenuItem border="none" onClick={() => props.manualStagingFunction()}>
                  Trigger staging workflow
                </MenuItem>
              )}
              {props.refreshDataFunction && (
                <MenuItem border="none" onClick={() => props.refreshDataFunction()}>
                  Refresh data
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : null}
      </Flex>

      <Text my="2">{props.branchName}</Text>

      <Text my="2" color="gray.500" fontSize="sm">
        {moment(props.createdAt).fromNow()}
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
        <Button
          rightIcon={<FaArrowRight />}
          colorScheme="teal"
          variant="outline"
          mr="20px"
          isDisabled
        >
          <Text>Runs details</Text>
        </Button>
      </Box>
    </Box>
  );
}
