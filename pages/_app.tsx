import { ChakraProvider } from '@chakra-ui/core';
import customTheme from '../config/theme';
import Header from '../components/Header';
import { Provider } from 'next-auth/client';
import { ReactQueryDevtools } from 'react-query-devtools';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={customTheme}>
        <Header session={pageProps.session} />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </Provider>
  );
}
