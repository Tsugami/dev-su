import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContextProvider } from './modules/auth/AuthContext';

import UserPage from './modules/user/UserPage';
import HomePage from './modules/home/HomePage';

function Routes() {
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route path='/'>
            <HomePage />
          </Route>
          <Route path='/user/:id'>
            <UserPage />
          </Route>
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default Routes;
