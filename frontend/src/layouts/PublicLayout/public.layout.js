import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { NavBar, AuthNavBar } from '../../components'
import { AuthContext } from '../../context/auth'

const PublicLayout = props => {
  const { component: Component, ...rest } = props
  const { authTokens } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      component={props => {
        return (
          <div>
            {authTokens ? <AuthNavBar {...props} /> : <NavBar {...props} />}
            <Component {...props} />
          </div>
        )
      }}
		/>
  )
}

export default PublicLayout
