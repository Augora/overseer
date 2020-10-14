import { useColorMode, Button, Flex, Text, Box, Heading } from '@chakra-ui/core';
import { createGlobalStyle } from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  html,body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
    background-color: ${(props) => (props.colorMode === 'light' ? 'white' : 'rgb(26, 32, 44)')};
    color: ${(props) => (props.colorMode === 'light' ? 'rgb(26, 32, 44)' : 'white')};
  }

  * {
    box-sizing: border-box;
  }
`;

function Header() {
  const { colorMode } = useColorMode();
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      boxShadow="0 0 10px rgba(0,0,0,.5)"
    >
      <GlobalStyle colorMode={colorMode}></GlobalStyle>
      {!session && (
        <>
          Not signed in <br />
          <Button onClick={signIn} variant="solid" size="lg">
            Sign in
          </Button>
        </>
      )}
      {session && (
        <>
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg">
              {session.user.name}
            </Heading>
          </Flex>
          <Flex align="center" mr={5}>
            <Link href="/">
              <Button variant="solid" size="lg" isDisabled={router.pathname === '/'}>
                Home
              </Button>
            </Link>
            <Link href="/groupes-parlementaires">
              <Button
                variant="solid"
                size="lg"
                isDisabled={router.pathname === '/groupes-parlementaires'}
              >
                Groupes Parlementaires
              </Button>
            </Link>
          </Flex>
          <Button onClick={signOut} variant="solid" size="lg">
            Sign out
          </Button>
        </>
      )}
    </Flex>
  );
}

export default Header;
