import { ChakraProvider } from '@chakra-ui/react';
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

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ChakraProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <Header {...pageProps} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </Auth.UserContextProvider>
  );
}
