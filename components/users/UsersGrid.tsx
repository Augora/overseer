import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
// import { useTable } from 'react-table';
import UserBox from './UserBox';
import { FaPlusCircle } from 'react-icons/fa';
// import { CreateUserWithAdminRole } from '../../lib/faunadb/users/DataResolver';
import { User } from '@supabase/supabase-js';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

interface IUsersGridProps {
  data: (User & { userRole: Types.Canonical.UserRole })[];
  refetch: Function;
}

export default function UsersGrid(props: IUsersGridProps) {
  console.log({ props });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const usernameField = React.useRef();

  const [Username, setUsername] = useState('');
  const [IsAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Button
          aria-label="Create user"
          rightIcon={<FaPlusCircle />}
          onClick={onOpen}
          ref={btnRef}
          mr={{ base: 0, md: 10 }}
          mb={{ base: 5, md: 10 }}
          disabled
        >
          Create user
        </Button>
      </Flex>
      <SimpleGrid minChildWidth="300px" spacing="40px">
        {props.data.map((user) => (
          <UserBox
            key={user.user_metadata.user_name}
            user={user}
            userRole={user.userRole}
            refetch={props.refetch}
          />
        ))}
      </SimpleGrid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        initialFocusRef={usernameField}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add user</DrawerHeader>

            <DrawerBody>
              <Stack spacing="5">
                <Box>
                  <FormLabel htmlFor="Username">Username</FormLabel>
                  <Input
                    id="Username"
                    value={Username}
                    placeholder="KevinBacas"
                    ref={usernameField}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Box>

                <Box>
                  <Checkbox
                    colorScheme="teal"
                    checked={IsAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  >
                    Is admin?
                  </Checkbox>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => {
                  // CreateUserWithAdminRole(props.token, Username, IsAdmin).then(() =>
                  //   props.refetch()
                  // );
                  setUsername('');
                  setIsAdmin(false);
                  onClose();
                }}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
