import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserPage from './modules/user/UserPage';
import HomePage from './modules/home/HomePage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
        <Route path='/user/:id'>
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
