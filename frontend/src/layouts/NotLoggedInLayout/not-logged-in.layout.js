import React from 'react'
import { Route } from 'react-router-dom'
import { NavBar } from '../../components'

const NotLoggedInLayout = props => {
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
