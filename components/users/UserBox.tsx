import React from 'react';
import { Box, Heading, useColorMode, Checkbox, CheckboxGroup, Link } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
import { UpdateUserAdminRole } from '../../lib/faunadb/users/DataResolver';

interface IUserBoxProps {
  token: string;
  name: string;
  isAdmin: boolean;
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
        <Link href={`https://github.com/${props.name}`}>
          <Heading size="lg" mb="5">
            {props.name}
          </Heading>
        </Link>
        <Checkbox
          defaultIsChecked={props.isAdmin}
          colorScheme="teal"
          onChange={(e) => {
            UpdateUserAdminRole(props.token, props.name, e.target.checked);
          }}
        >
          Is admin?
        </Checkbox>
      </Box>
    </ScaleFade>
  );
}
