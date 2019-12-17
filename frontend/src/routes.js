import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { PublicLayout, PrivateLayout } from './layouts'
import { HomeFeed, LoginPage, RegistrationPage, ProfilePage, NewsItem } from './containers'

const Routes = () =>
  <Router>
    <Switch>
      <PublicLayout component={HomeFeed} path='/' exact />
      <PublicLayout component={RegistrationPage} path='/register' exact />
      <PublicLayout component={NewsItem} path='/news/:slug' />
      <PublicLayout component={LoginPage} path='/login' exact />
      <PrivateLayout component={ProfilePage} path='/profile' exact />
    </Switch>
  </Router>

export default Routes
