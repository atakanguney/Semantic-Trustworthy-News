import React, { Fragment } from 'react'
import './App.css'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContextProvider } from './context/auth'

const App = () => {
  return (
    <AuthContextProvider>
      <Fragment>
        <Routes />
      </Fragment>
    </AuthContextProvider>
  )
}

export default App
