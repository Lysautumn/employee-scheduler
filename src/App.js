import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch,} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ManagerView from './components/ManagerView';
import EmployeeView from './components/EmployeeView';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact path="/" to="/home"/>
          <Route
            path="/home"
            component={LandingPage}
          />
          <Route 
            path="/manager-view"
            component={ManagerView}
          />
          <Route
            path="/employee-view"
            component={EmployeeView}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
