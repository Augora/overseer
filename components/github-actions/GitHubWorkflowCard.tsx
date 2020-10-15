/* tslint:disable */
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
      borderRadius="5px"
      minHeight="250px"
      p="5"
      width="100%"
      bg="gray.900"
      _hover={{ bg: 'gray.700' }}
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
            py="1"
            mr="10px"
            bg={
              props.lastRunStatus === 'success'
                ? 'green.500'
                : props.lastRunStatus === 'failure'
                ? 'red.500'
                : 'orange.500'
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
            <MenuButton>
              <IconButton aria-label="Open menu" icon="triangle-down" />
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
      </Box>

      <Text my="2">{props.branchName}</Text>

      <Text my="2" color="gray.500" fontSize="sm">
        {moment(props.createdAt).fromNow()}
      </Text>

      <Box my="4" display="flex" justifyContent="start" alignItems="center">
        <Button
          rightIcon="arrow-forward"
          variantColor="teal"
          variant="outline"
          mr="20px"
          onClick={() => window.open(props.logsUrl, '_blank')}
        >
          <Text>Logs</Text>
        </Button>
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
