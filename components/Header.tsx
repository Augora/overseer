import { Button, Flex, Text, Heading, PseudoBox } from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      {!props.session && (
        <>
          <Heading as="h1" size="lg">
            Overseer
          </Heading>
          <Button onClick={signIn} variant="solid" size="lg">
            Sign in
          </Button>
        </>
      )}
      {props.session && (
        <>
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
                    Home
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
                    Groupes Parlementaires
                  </Text>
                </Link>
              </PseudoBox>
            </Flex>
            <Button onClick={signOut} variant="solid" size="lg">
              Sign out
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default Header;
