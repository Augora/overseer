import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import customTheme from '../config/theme';
import Header from '../components/Header';
import { Provider, getSession } from 'next-auth/client';
import { ReactQueryDevtools } from 'react-query-devtools';
import { NextPageContext } from 'next';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider value={'dark'}>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}
