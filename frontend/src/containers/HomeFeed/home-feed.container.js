import React, { useState, useEffect } from 'react'
import { fetchNews } from '../../helpers/fetchNews'
import NewsList from '../NewsList'

const HomeFeedContainer = props => {
  const [news, setNews] = useState([])

  const getNews = async () => {
    let newsList = await fetchNews()
    setNews(newsList)
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <div>
      <h1>Semantic Trustworthy News</h1>
      <NewsList newsList={news} />
    </div>
  )
}

export default HomeFeedContainer
