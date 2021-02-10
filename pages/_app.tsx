import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import customTheme from '../config/theme';
import Header from '../components/Header';

const queryClient = new QueryClient();

function getColorModeManager(cookies) {
  return typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;
}

export default function MyApp({ Component, pageProps }) {
  const colorModeManager = getColorModeManager(pageProps.cookies);
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
        <QueryClientProvider client={queryClient}>
          <Header session={pageProps.session} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
}
