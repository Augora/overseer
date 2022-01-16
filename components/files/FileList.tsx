import { List, Box, Spinner, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { FaSync, FaArrowUp } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import FileListeItem from './FileListItem';

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

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
            return resolve({});
            // return resolve(CreateFile(file.name, arrayBufferToBase64(fileContent)));
          }
          return reject('Wrong type recognized.');
        };
        reader.readAsArrayBuffer(file);
      });
    });
    Promise.all(processes).then(refetchMethod);
  };
}

function UploadFileButton(props) {
  const { getRootProps, getInputProps } = useDropzone({
    // onDrop: uploadFiles(props.refetch),
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
  const { isLoading, data, isFetching, refetch } = {
    isLoading: true,
    data: [],
    isFetching: true,
    refetch: (f) => f,
  };
  // const { isLoading, data, isFetching, refetch } = useQuery('files', () => ListFiles());
  const { getRootProps } = useDropzone({
    // onDrop: uploadFiles(refetch),
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
          rightIcon={isFetching ? <Spinner size="sm" /> : <FaSync />}
          // onClick={() => refetch()}
          width={{ base: 'auto', md: 150 }}
          mr={{ base: 0, md: 10 }}
          mb={{ base: 5, md: 10 }}
          isDisabled={isFetching}
        >
          Refresh
        </Button>
        <UploadFileButton refetch={refetch} />
      </Flex>
      <List>
        {data &&
          data.map((f) => {
            return (
              <FileListeItem
                key={f.name + '-' + f.properties.etag}
                refetch={refetch}
                {...f}
              ></FileListeItem>
            );
          })}
      </List>
    </Box>
  );
}
