import React from 'react';
import {
  Badge,
  Box,
  Button,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  Spinner,
  Text,
} from '@chakra-ui/core';
import moment from 'moment';

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
  return (
    <PseudoBox
      borderWidth="2px"
      borderStyle="solid"
      borderColor="lightGray"
      borderRadius="0.3em"
      minHeight="250px"
      p={5}
      width="100%"
      _hover={{ bg: 'gray.100' }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading m="0" size="lg">
          <Text width="100%" m="0" as="span" mr="10px">
            <Link href={props.repositoryUrl} color="inherit" target="_blank">
              {props.repositoryName}
            </Link>
          </Text>
          <Badge
            rounded="full"
            px="2"
            mr="10px"
            bg={
              props.lastRunStatus === 'success'
                ? 'green.300'
                : props.lastRunStatus === 'failure'
                ? 'red.300'
                : 'orange.300'
            }
          >
            {props.lastRunStatus}
          </Badge>

          {props.isFetching && <Spinner />}
        </Heading>
        {props.manualProductionFunction ||
        props.manualStagingFunction ||
        props.refreshDataFunction ? (
          <Menu>
            <MenuButton as={IconButton} border="none" bg="gray.400" />
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
      </Box>

      <Text>Branch: {props.branchName}</Text>
      <Text color="gray.500" fontSize="sm">
        {moment(props.createdAt).fromNow()}
      </Text>

      <Box display="flex" justifyContent="start" alignItems="center">
        <Link href={props.logsUrl} target="_blank" color="inherit" textDecoration="inherit">
          <Button rightIcon="arrow-forward" variantColor="teal" variant="outline" mr="20px">
            <Text>Logs</Text>
          </Button>
        </Link>
        <Button
          rightIcon="arrow-forward"
          variantColor="teal"
          variant="outline"
          mr="20px"
          isDisabled
        >
          <Text>Runs details</Text>
        </Button>
      </Box>
    </PseudoBox>
  );
}
