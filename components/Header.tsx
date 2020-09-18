import { useColorMode, Button, Flex, Text } from '@chakra-ui/core';
import { createGlobalStyle } from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ColorModeExample() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button size="sm" onClick={toggleColorMode} color={colorMode === 'light' ? 'black' : 'white'}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  );
}

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
    >
      <GlobalStyle colorMode={colorMode}></GlobalStyle>
      {/* <ColorModeExample /> */}
      {!session && (
        <>
          Not signed in <br />
          <Button
            onClick={signIn}
            variant="solid"
            size="lg"
            color={colorMode === 'light' ? 'black' : 'white'}
          >
            Sign in
          </Button>
        </>
      )}
      {session && (
        <>
          <div>
            <div>
              Signed in as {session.user.name} ({session.user.email})
            </div>
            <div>FaunaDB Token {session.user.faunaDBToken}</div>
            <div>GitHub Token {session.user.accessToken}</div>
          </div>
          <Link href="/">
            <Button
              variant="solid"
              size="lg"
              bg={colorMode === 'light' ? 'black' : 'white'}
              color={colorMode === 'light' ? 'white' : 'black'}
              isDisabled={router.pathname === '/'}
            >
              Home
            </Button>
          </Link>
          <Link href="/groupes-parlementaires">
            <Button
              variant="solid"
              size="lg"
              bg={colorMode === 'light' ? 'black' : 'white'}
              color={colorMode === 'light' ? 'white' : 'black'}
              isDisabled={router.pathname === '/groupes-parlementaires'}
            >
              Groupes Parlementaires
            </Button>
          </Link>
          <Button
            onClick={signOut}
            variant="solid"
            size="lg"
            bg={colorMode === 'light' ? 'black' : 'white'}
            color={colorMode === 'light' ? 'white' : 'black'}
          >
            Sign out
          </Button>
        </>
      )}
    </Flex>
  );
}

export default Header;
