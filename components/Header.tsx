import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Button,
  Flex,
  Text,
  Heading,
  Box,
  Progress,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { Auth } from '@supabase/ui';

import supabase from '../lib/supabase/Client';

const routes = [
  {
    Label: 'Home',
    URL: '/',
  },
  {
    Label: 'Groupes',
    URL: '/groupes-parlementaires',
  },
  // {
  //   Label: 'Files',
  //   URL: '/files',
  // },
  {
    Label: 'Users',
    URL: '/users',
  },
];

function Header(props) {
  const router = useRouter();
  const [IsRouteLoading, setIsRouteLoading] = useState(false);
  const { session } = Auth.useUser();

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
      <Link href={r.URL} passHref>
        <Button color={router.pathname === r.URL ? 'teal.200' : 'none'} variant="ghost">
          {r.Label}
        </Button>
      </Link>
    </Box>
  ));

  const routeMenuLinks = routes.map((r) => (
    <Link key={r.URL} href={r.URL} passHref>
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
          <Link href="/" passHref>
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
          <Flex display={{ base: 'none', md: 'flex' }}>{session && routeLinks}</Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end" display={{ base: 'none', md: 'flex' }}>
          {session && (
            <Avatar
              size="sm"
              name={session.user.user_metadata.preferred_username}
              src={session.user.user_metadata.avatar_url}
            />
          )}
          <Button
            mx="2"
            variant="ghost"
            onClick={() =>
              session
                ? supabase.auth.signOut()
                : supabase.auth.signIn({
                    provider: 'github',
                  })
            }
          >
            {session ? 'Sign out' : 'Sign in'}
          </Button>
        </Flex>
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu isLazy>
            <MenuButton>
              <FaBars />
            </MenuButton>
            <MenuList>
              {session && routeMenuLinks}
              {session && <MenuDivider />}
              <MenuItem
                onClick={() =>
                  session
                    ? supabase.auth.signOut()
                    : supabase.auth.signIn({
                        provider: 'github',
                      })
                }
              >
                <Text fontSize="2xl">{session ? 'Sign out' : 'Sign in'}</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
