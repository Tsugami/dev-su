import { Suspense } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './shared-components/Header';
import ErrorBoundary from './shared-components/ErrorBoundary';
import LoadingPage from './shared-components/LoadingPage';

import UserPage from './modules/user/UserPage';
import HomePage from './modules/home/HomePage';

function Routes() {
  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route path='/'>
              <HomePage />
            </Route>
            <Route path='/user/:id'>
              <UserPage />
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default Routes;
