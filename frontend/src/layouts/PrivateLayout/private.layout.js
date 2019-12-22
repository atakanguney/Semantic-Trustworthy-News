import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthNavBar } from '../../components'
import { AuthContext } from '../../context/auth'

const PrivateLayout = ({ component: Component, ...rest }) => {
  const { authTokens } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      component={props =>
				authTokens
					? <div>
  <AuthNavBar {...props} />
  <Component {...props} />
						</div>
					: <Redirect to='login' />}
		/>
  )
}

export default PrivateLayout
