import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Link,
  useColorMode,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  FormLabel,
  Stack,
  Select,
} from '@chakra-ui/react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { BlobItem } from '@azure/storage-blob';
import mime from 'mime-types';
import { formatDistanceToNow, parseJSON } from 'date-fns';

import { RemoveFile } from '../../lib/files/Wrapper';

interface IFileListItemProps {
  refetch: Function;
}

export default function FileListItem(props: BlobItem & IFileListItemProps) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const firstField = React.useRef();

  return (
    <ListItem
      p="5"
      borderRadius="5px"
      transition="background-color cubic-bezier(1, 0, 0, 1) 250ms"
      _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.700' }}
    >
      <Flex justify="space-between">
        <Box>
          <Heading size="lg">{props.name}</Heading>
          {(props.properties.contentLength / 1024).toFixed(2)}kb |{' '}
          {formatDistanceToNow(parseJSON(props.properties.lastModified))}
        </Box>

        <Box>
          <Link href={`/api/file/${props.name}`} target="_blank">
            <IconButton size="sm" mx="2" aria-label="Read file" icon={<FaEye />} />
          </Link>
          <IconButton
            size="sm"
            mx="2"
            aria-label="Edit file"
            icon={<FaPen />}
            ref={btnRef}
            onClick={onOpen}
          />
          <IconButton
            size="sm"
            mx="2"
            aria-label="Remove file"
            icon={<FaTrash />}
            onClick={() => RemoveFile(props.name).then(() => props.refetch())}
          />
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Modify {props.name}</DrawerHeader>

            <DrawerBody>
              <Stack spacing="5">
                <Box>
                  <FormLabel htmlFor="Content-Type">Content-Type</FormLabel>
                  <Select id="Content-Type" ref={firstField} value={props.properties.contentType}>
                    {Object.keys(mime.extensions).map((ext) => (
                      <option key={ext} value={ext}>
                        {ext}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="Cache-Control">Cache-Control</FormLabel>
                  <Input
                    id="Cache-Control"
                    value={props.properties.cacheControl}
                    placeholder="1 hour, 24 hours, 1 year, ..."
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </ListItem>
  );
}
