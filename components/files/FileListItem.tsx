import React from 'react';
import { Box, Flex, Heading, IconButton, ListItem, Link } from '@chakra-ui/core';

import { FaEye, FaPen } from 'react-icons/fa';

interface IFileListItem {
  name: string;
}

export default function FileListItem(props: IFileListItem) {
  return (
    <ListItem
      p="5"
      borderRadius="5px"
      transition="background-color cubic-bezier(1, 0, 0, 1) 250ms"
      _hover={{ bg: 'gray.700' }}
    >
      <Flex justify="space-between">
        <Heading size="lg">{props.name}</Heading>
        <Box>
          <Link href={`/api/file/${props.name}`} target="_blanck">
            <IconButton size="sm" mx="2" aria-label="Read file" icon={<FaEye />} />
          </Link>
          <IconButton size="sm" mx="2" aria-label="Edit file" icon={<FaPen />} />
        </Box>
      </Flex>
    </ListItem>
  );
}
