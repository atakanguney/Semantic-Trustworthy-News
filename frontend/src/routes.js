import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { NotLoggedInLayout } from './layouts'
import { HomeFeed, LoginPage } from './containers'

const Routes = () =>
  <Router>
    <Switch>
      <NotLoggedInLayout component={HomeFeed} path='/' exact />
      <NotLoggedInLayout component={LoginPage} path='/login-page' exact />
    </Switch>
  </Router>

export default Routes
