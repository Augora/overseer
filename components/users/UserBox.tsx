import React from 'react';
import { Box, Heading, useColorMode, Checkbox, Link, Flex, IconButton } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
// import { DeleteUser, UpdateUserAdminRole } from '../../lib/faunadb/users/DataResolver';
import { FaTrash } from 'react-icons/fa';

interface IUserBoxProps {
  name: string;
  isAdmin: boolean;
  refetch: Function;
}

export default function UserBox(props: IUserBoxProps) {
  const { colorMode } = useColorMode();
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Box
        borderRadius="5px"
        p="5"
        bg={colorMode === 'light' ? 'gray.400' : 'gray.900'}
        transition="background-color cubic-bezier(1, 0, 0, 1) 200ms"
        _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.700' }}
      >
        <Flex justifyContent="space-between">
          <Link href={`https://github.com/${props.name}`}>
            <Heading size="lg">{props.name}</Heading>
          </Link>
          <IconButton
            aria-label="Remove"
            icon={<FaTrash />}
            onClick={() => {
              // DeleteUser(props.token, props.name).then(() => props.refetch());
            }}
          />
        </Flex>
        <Checkbox
          defaultIsChecked={props.isAdmin}
          colorScheme="teal"
          onChange={(e) => {
            // UpdateUserAdminRole(props.token, props.name, e.target.checked);
          }}
        >
          Is admin?
        </Checkbox>
      </Box>
    </ScaleFade>
  );
}
