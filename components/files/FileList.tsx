import { List, ListItem, Box, Spinner, Button, Flex } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { FaSync, FaArrowUp } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import { ListFiles, CreateFile } from '../../lib/files/Wrapper';

function uploadFiles(refetchMethod: (value: any) => any) {
  return function processFiles(acceptedFiles: File[]) {
    const processes = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = () => {
          const fileContent = reader.result;
          if (fileContent instanceof ArrayBuffer) {
            return reject('Wrong type recognized.');
          }
          return resolve(CreateFile(file.name, fileContent));
        };
        reader.readAsText(file);
      });
    });
    Promise.all(processes).then(refetchMethod);
  };
}

function UploadFileButton(props) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: uploadFiles(props.refetch),
    noDrag: true,
  });

  return (
    <Button
      {...getRootProps()}
      aria-label="Upload file"
      rightIcon={<FaArrowUp />}
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
    onDrop: uploadFiles(refetch),
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
          rightIcon={isFetching ? <Spinner /> : <FaSync />}
          onClick={() => refetch()}
          width={{ base: 'auto', md: 150 }}
          mr={{ base: 0, md: 10 }}
          mb={{ base: 5, md: 10 }}
          isDisabled={isFetching}
        >
          Refesh
        </Button>
        <UploadFileButton refetch={refetch} />
      </Flex>
      <List spacing={10}>
        {data && data.map((f) => <ListItem key={f.name + '-' + f.etag}>{f.name}</ListItem>)}
      </List>
    </Box>
  );
}
