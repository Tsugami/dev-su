import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import RelayEnvironment from './relay/RelayEnvironment';
import Routes from './routes';
import ErrorBoundary from './shared-components/ErrorBoundary';
import LoadingPage from './shared-components/LoadingPage';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <Routes />
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}
