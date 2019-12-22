export const getAuthTokens = () => {
  const raw = localStorage.getItem('tokens')
  if (raw !== 'undefined') {
    return JSON.parse(raw)
  } else {
    return null
  }
}
