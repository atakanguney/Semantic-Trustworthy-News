import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { NavBar } from '../../components'

const PrivateLayout = ({ component: Component, ...rest }) => {
  const {authTokens} = useAuth()
  console.log(authTokens)
  return (
    <Route
      {...rest}
      render={props => (authTokens ?
      <div>
        <NavBar {...props}/>
        <Component {...props} />
      </div> : <Redirect to='login' />)}
    />
  )
}

export default PrivateLayout

