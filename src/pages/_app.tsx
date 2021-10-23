import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import GithubCorner from 'react-github-corner';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pageProps} />
        <GithubCorner href={process.env.NEXT_PUBLIC_REPO_URL} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
