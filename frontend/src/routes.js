import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { NotLoggedInLayout, PrivateLayout } from './layouts'
import { HomeFeed, LoginPage, RegistrationPage, ProfilePage } from './containers'

const Routes = () =>
  <Router>
    <Switch>
      <NotLoggedInLayout component={HomeFeed} path='/' exact />
      <NotLoggedInLayout component={RegistrationPage} path='/register' exact />
      <NotLoggedInLayout component={LoginPage} path='/login' exact />
      <PrivateLayout component={ProfilePage} path='/profile' exact />

    </Switch>
  </Router>

export default Routes
