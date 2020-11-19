import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, signOut } from 'next-auth/client';
import {
  Button,
  Flex,
  Text,
  Heading,
  Box,
  useColorMode,
  Progress,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';

import { FaUsers, FaHome, FaFolder, FaSun, FaMoon, FaBars } from 'react-icons/fa';

const routes = [
  {
    Label: 'Home',
    URL: '/',
  },
  {
    Label: 'Groupes',
    URL: '/groupes-parlementaires',
  },
  {
    Label: 'Files',
    URL: '/files',
  },
  {
    Label: 'Users',
    URL: '/users',
  },
];

function Header(props) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [IsRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsRouteLoading(true));
    Router.events.on('routeChangeComplete', () => setIsRouteLoading(false));
    Router.events.on('routeChangeError', () => setIsRouteLoading(false));
  }, []);

  const routeLinks = routes.map((r) => (
    <Box
      key={r.URL}
      mx="2"
      _hover={{
        color: 'teal.200',
        cursor: 'pointer',
      }}
    >
      <Link href={r.URL}>
        <Button color={router.pathname === r.URL ? 'teal.200' : 'none'} variant="ghost">
          {r.Label}
        </Button>
      </Link>
    </Box>
  ));

  const routeMenuLinks = routes.map((r) => (
    <Link key={r.URL} href={r.URL}>
      <MenuItem>
        <Text fontSize="2xl" color={router.pathname === r.URL ? 'teal.200' : 'none'}>
          {r.Label}
        </Text>
      </MenuItem>
    </Link>
  ));

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
        <Flex>
          <Link href="/">
            <Box
              mr="10"
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
          <Flex display={{ base: 'none', md: 'flex' }}>{props.session && routeLinks}</Flex>
        </Flex>
        <Flex justifyContent="flex-end" display={{ base: 'none', md: 'flex' }}>
          <Button onClick={toggleColorMode} mx="2" variant="ghost">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          <Button onClick={props.session ? signOut : signIn} mx="2" variant="ghost">
            {props.session ? 'Sign out' : 'Sign in'}
          </Button>
        </Flex>
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu isLazy>
            <MenuButton size="sm">
              <FaBars />
            </MenuButton>
            <MenuList>
              {props.session && routeMenuLinks}
              {props.session && <MenuDivider />}
              <MenuItem onClick={toggleColorMode}>
                <Text fontSize="2xl">{colorMode === 'light' ? <FaMoon /> : <FaSun />}</Text>
              </MenuItem>
              <MenuItem onClick={props.session ? signOut : signIn}>
                <Text fontSize="2xl">{props.session ? 'Sign out' : 'Sign in'}</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
