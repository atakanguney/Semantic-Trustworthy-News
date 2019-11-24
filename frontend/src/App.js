import React, { Fragment, useState } from 'react'
import './App.css'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from './context/auth'

function App () {
  const [authTokens, setAuthTokens] = useState()

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Fragment>
        <Routes />
      </Fragment>
    </AuthContext.Provider>
  )
}

export default App
