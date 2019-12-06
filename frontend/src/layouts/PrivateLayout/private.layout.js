import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { NavBar } from '../../components'

const PrivateLayout = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth()

  return (
    <Route
      {...rest}
      component={({ history, matchedProps }) =>
				authTokens
					? <div>
  <NavBar {...{ ...matchedProps, history }} />
  <Component {...{ ...matchedProps, history }} />
						</div>
					: <Redirect to='login' />}
		/>
  )
}

export default PrivateLayout
