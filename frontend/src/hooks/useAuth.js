import { useState } from 'react'

export const useAuth = initialTokens => {
  const [authTokens, setAuthTokens] = useState(initialTokens)

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  const removeTokens = () => {
    localStorage.clear()
    setAuthTokens(null)
  }

  return { authTokens, setAuthTokens: setTokens, removeAuthTokens: removeTokens }
}
