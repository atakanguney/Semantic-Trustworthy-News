import axios from 'axios'

export const fetchNews = () => {
  return axios.get('/api/all-news')
}

export const updateNews = () => {
  return axios.post('/api/update-news', {
    source: 'abc-news'
  })
}
