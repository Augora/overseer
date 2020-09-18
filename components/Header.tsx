import { useColorMode, Button } from '@chakra-ui/core';
import { createGlobalStyle } from 'styled-components';

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
  return (
    <>
      <GlobalStyle colorMode={colorMode}></GlobalStyle>
      <ColorModeExample />
    </>
  );
}

export default Header;
