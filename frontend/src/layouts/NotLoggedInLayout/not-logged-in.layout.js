import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar } from '../../components'
import { useAuth } from '../../context/auth'


const NotLoggedInLayout = props => {
  const {authTokens} = useAuth()
  console.log(authTokens)

  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      component={({ history, matchProps }) =>
        <div>
          <NavBar {...{ history, matchProps }} />
          <Component {...{ history, matchProps }} />
        </div>}
		/>
  )
}

export default NotLoggedInLayout
