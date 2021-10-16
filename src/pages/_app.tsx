import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import GithubCorner from 'react-github-corner';

import RelayEnvironment from '../relay/RelayEnvironment';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Component {...pageProps} />
          <GithubCorner href={process.env.NEXT_PUBLIC_REPO_URL} />
        </RelayEnvironmentProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
