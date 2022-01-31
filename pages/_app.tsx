import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Auth } from '@supabase/ui';

import supabase from '../lib/supabase/Client';
import customTheme from '../config/theme';
import Header from '../components/Header';

import '../styles/global.css';
import '@fontsource/roboto-slab/700.css';
import '@fontsource/roboto-slab/400.css';

const queryClient = new QueryClient();

function getColorModeManager(cookies) {
  return typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;
}

export default function MyApp({ Component, pageProps }) {
  const colorModeManager = getColorModeManager(pageProps.cookies);
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
        <QueryClientProvider client={queryClient}>
          <Header {...pageProps} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </Auth.UserContextProvider>
  );
}
