import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, signOut } from 'next-auth/client';
import { Button, Flex, Text, Heading, Box, useColorMode, Progress } from '@chakra-ui/core';

import { FaUsers, FaHome, FaFolder, FaSun, FaMoon } from 'react-icons/fa';

function Header(props) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [IsRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsRouteLoading(true));
    Router.events.on('routeChangeComplete', () => setIsRouteLoading(false));
    Router.events.on('routeChangeError', () => setIsRouteLoading(false));
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      mb={10}
      p={5}
      boxShadow="0 0 10px rgba(0,0,0,.5)"
    >
      {IsRouteLoading && (
        <Progress
          size="xs"
          isIndeterminate
          bg="transparent"
          position="absolute"
          top="0"
          left="0"
          width="100%"
        />
      )}
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Link href="/">
          <Box
            transition="color cubic-bezier(1, 0, 0, 1) 250ms"
            _hover={{
              color: 'teal.300',
              cursor: 'pointer',
            }}
          >
            <Heading as="h1" size="lg">
              Overseer
            </Heading>
          </Box>
        </Link>
        {props.session && (
          <Flex justifyContent="space-around">
            <Box
              mx="2"
              transition="color cubic-bezier(1, 0, 0, 1) 250ms"
              _hover={{
                color: 'teal.300',
                cursor: 'pointer',
              }}
            >
              <Link href="/">
                <Text fontSize="2xl" color={router.pathname === '/' ? 'teal.300' : 'white.300'}>
                  <FaHome />
                </Text>
              </Link>
            </Box>
            <Box
              mx="2"
              transition="color cubic-bezier(1, 0, 0, 1) 250ms"
              _hover={{
                color: 'teal.300',
                cursor: 'pointer',
              }}
            >
              <Link href="/groupes-parlementaires">
                <Text
                  fontSize="2xl"
                  color={router.pathname === '/groupes-parlementaires' ? 'teal.300' : 'white.300'}
                >
                  <FaUsers />
                </Text>
              </Link>
            </Box>
            <Box
              mx="2"
              _hover={{
                color: 'teal.300',
                cursor: 'pointer',
              }}
            >
              <Link href="/files">
                <Text
                  fontSize="2xl"
                  color={router.pathname === '/files' ? 'teal.300' : 'white.300'}
                >
                  <FaFolder />
                </Text>
              </Link>
            </Box>
          </Flex>
        )}
        <Box>
          <Button onClick={toggleColorMode} size="lg" mr="5">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          <Button onClick={props.session ? signOut : signIn} size="lg">
            {props.session ? 'Sign out' : 'Sign in'}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
