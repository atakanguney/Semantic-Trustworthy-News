import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { NavBar } from '../../components'
import { AuthContext } from '../../context/auth'

const PrivateLayout = ({ component: Component, ...rest }) => {
  const { authTokens } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      component={({ history, matchProps }) =>
				authTokens
					? <div>
  <NavBar {...{ ...matchProps, history }} />
  <Component {...{ ...matchProps, history }} />
						</div>
					: <Redirect to='login' />}
		/>
  )
}

export default PrivateLayout
