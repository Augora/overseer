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
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import UserBox from './UserBox';
import { FaPlusCircle } from 'react-icons/fa';
import { User } from '@supabase/supabase-js';

interface IUsersGridProps {
  data: (User & { userRole: Types.Canonical.UserRole })[];
  refetch: Function;
}

export default function UsersGrid(props: IUsersGridProps) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {props.data.map((user) => (
          <UserBox
            key={user.user_metadata.user_name}
            user={user}
            userRole={user.userRole}
            refetch={props.refetch}
          />
        ))}
      </div>
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
                  // ToDo: Use CreateUser API
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
