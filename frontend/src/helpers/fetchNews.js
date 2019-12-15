import axios from 'axios'

export const fetchNews = () => {
  return axios.get('/api/all-news')
}
