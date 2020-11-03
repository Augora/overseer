import { Button, Flex, Text, Heading, PseudoBox } from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { FaUsers } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

function Header(props) {
  const router = useRouter();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={10}
      p={5}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      boxShadow="0 0 10px rgba(0,0,0,.5)"
    >
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
          <PseudoBox
            _hover={{
              color: 'teal.300',
              cursor: 'pointer',
            }}
          >
            <Heading as="h1" size="lg">
              Overseer
            </Heading>
          </PseudoBox>
        </Link>
        {props.session && (
          <Flex justifyContent="space-around">
            <PseudoBox
              mx="2"
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
            </PseudoBox>
            <PseudoBox
              mx="2"
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
            </PseudoBox>
          </Flex>
        )}
        <Button onClick={props.session ? signOut : signIn} variant="solid" size="lg">
          {props.session ? 'Sign out' : 'Sign in'}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
