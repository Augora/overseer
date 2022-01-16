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
import { useTable } from 'react-table';
import UserBox from './UserBox';
import { FaPlusCircle } from 'react-icons/fa';
// import { CreateUserWithAdminRole } from '../../lib/faunadb/users/DataResolver';

interface IUsersGridProps {
  data: {
    UserId: string;
    Role: boolean;
  }[];
  refetch: Function;
}

export default function UsersGrid(props: IUsersGridProps) {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'UserId',
      },
      {
        Header: 'Is admin?',
        accessor: 'Role',
      },
    ],
    []
  );
  const { rows } = useTable({
    columns: columns,
    data: props.data,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const usernameField = React.useRef();

  const [Username, setUsername] = useState('');
  const [IsAdmin, setIsAdmin] = useState(false);

  const parsedRows = rows.map((row) => {
    return {
      name: row.original.user_metadata.user_name,
      isAdmin: row.original.userRole.Role === 'Admin',
    };
  });

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
        {parsedRows.map((row) => (
          <UserBox key={row.name} name={row.name} isAdmin={row.isAdmin} refetch={props.refetch} />
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
