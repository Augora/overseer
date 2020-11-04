import { List, ListItem, Box, Spinner, Button, Flex } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { FaSync, FaArrowUp } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import { ListFiles } from '../../lib/files/Wrapper';

function uploadFiles(acceptedFiles: File[]) {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      console.log(file.name, binaryStr);
    };
    reader.readAsArrayBuffer(file);
  });
}

function UploadFileButton() {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: uploadFiles,
    noDrag: true,
  });

  return (
    <Button
      {...getRootProps()}
      aria-label="Upload file"
      rightIcon={FaArrowUp}
      width={{ base: 'auto', md: 150 }}
      mr={{ base: 0, md: 10 }}
      mb={{ base: 5, md: 10 }}
    >
      <input {...getInputProps()} />
      Upload file
    </Button>
  );
}

export default function fileList() {
  const { isLoading, data, isFetching, refetch } = useQuery('files', () => ListFiles());
  const { getRootProps } = useDropzone({
    onDrop: uploadFiles,
    noClick: true,
  });

  return isLoading ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  ) : (
    <Box
      {...getRootProps({
        style: {
          outline: 'none',
        },
      })}
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Button
          aria-label="Refresh"
          rightIcon={isFetching ? Spinner : FaSync}
          onClick={() => refetch()}
          width={{ base: 'auto', md: 150 }}
          mr={{ base: 0, md: 10 }}
          mb={{ base: 5, md: 10 }}
          isDisabled={isFetching}
        >
          Refesh
        </Button>
        <UploadFileButton />
      </Flex>
      <List spacing={10}>
        {data && data.map((f) => <ListItem key={f.name + '-' + f.etag}>{f.name}</ListItem>)}
      </List>
    </Box>
  );
}
