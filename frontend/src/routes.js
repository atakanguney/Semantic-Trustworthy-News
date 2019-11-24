import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { NotLoggedInLayout, PrivateLayout } from './layouts'
import { HomeFeed, LoginPage, ProfilePage } from './containers'

const Routes = () =>
  <Router>
    <Switch>
      <NotLoggedInLayout component={HomeFeed} path='/' exact />
      <NotLoggedInLayout component={LoginPage} path='/login-page' exact />
      <PrivateLayout component={ProfilePage} path='/profile' exact />
    </Switch>
  </Router>

export default Routes
