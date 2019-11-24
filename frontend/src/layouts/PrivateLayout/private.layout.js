import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const PrivateLayout = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuth()
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to='login-page' />)}
		/>
  )
}

export default PrivateLayout
