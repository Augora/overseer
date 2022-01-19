import React from 'react';
import { Box, Heading, useColorMode, Checkbox, Link, Flex, IconButton } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
import { UpsertUserRoleToSupabase } from '../../lib/supabase/users/DataResolver';
import { User } from '@supabase/supabase-js';

interface IUserBoxProps {
  user: User;
  userRole: Types.Canonical.UserRole;
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
          <Link href={`https://github.com/${props.user.user_metadata.user_name}`}>
            <Heading size="lg">{props.user.user_metadata.user_name}</Heading>
          </Link>
        </Flex>
        <Checkbox
          defaultIsChecked={props.userRole?.Role === 'Admin'}
          colorScheme="teal"
          onChange={(e) => {
            UpsertUserRoleToSupabase(
              Object.assign({}, props.userRole, {
                Role: e.target.checked ? 'Admin' : 'Member',
                UserId: props.user.id,
              })
            );
          }}
        >
          Is admin?
        </Checkbox>
      </Box>
    </ScaleFade>
  );
}
