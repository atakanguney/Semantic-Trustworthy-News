import axios from 'axios'

export const fetchNews = () => {
  return axios.get('/api/all-news')
}

export const getNewsBySlug = slug => {
  return axios.get(`/api/news/${slug}`).then(response => {
    return response.data
  })
}

export const updateNews = () => {
  return axios.post('/api/update-news', {
    source: 'abc-news'
  })
}
