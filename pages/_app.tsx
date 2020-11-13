import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import customTheme from '../config/theme';
import Header from '../components/Header';
import { Provider } from 'next-auth/client';
import { ReactQueryDevtools } from 'react-query-devtools';

function getColorModeManager(cookies) {
  return typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;
}

export default function MyApp({ Component, pageProps }) {
  const colorModeManager = getColorModeManager(pageProps.cookies);
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
        <Header session={pageProps.session} />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </Provider>
  );
}
