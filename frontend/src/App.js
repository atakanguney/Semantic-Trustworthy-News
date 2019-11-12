import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

import ShowData from './containers/ShowData';
import Welcome from './containers/Welcome';


function App() {
  return (
    <Router>
      <div>
        <header>
          <p>
            HEADER
          </p>
        </header>
      </div>

      <Switch>
        <Route path='/' exact>
          <Welcome />
        </Route>
        <Route path='/showData' exact>
          <ShowData />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
