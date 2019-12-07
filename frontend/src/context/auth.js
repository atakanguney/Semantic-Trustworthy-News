import React, { createContext } from 'react'
import { getAuthTokens } from '../helpers/getAuthTokens'
import { useAuth } from '../hooks/useAuth'

const AuthContext = createContext()

const AuthContextProvider = props => {
  const { authTokens, setAuthTokens, removeAuthTokens } = useAuth(getAuthTokens())

  return <AuthContext.Provider value={{ authTokens, setAuthTokens, removeAuthTokens }} {...props} />
}

export { AuthContext, AuthContextProvider }
