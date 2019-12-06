import React, { Fragment, useState } from 'react'
import './App.css'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from './context/auth'

const App = () => {
  const getAuthUser = () => {
    const raw = localStorage.getItem('tokens')
    if (raw !== 'undefined') {
      return JSON.parse(raw)
    } else {
      return null
    }
  }

  const [authTokens, setAuthTokens] = useState(getAuthUser())

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  const removeTokens = () => {
    localStorage.clear()
    setAuthTokens(null)
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, removeTokens }}>
      <Fragment>
        <Routes />
      </Fragment>
    </AuthContext.Provider>
  )
}

export default App
