import React, { useState, useEffect } from 'react'
import { fetchNews } from '../../helpers/fetchNews'

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
      {news.map((item, key) =>
        <p key={key}>
          {item.title + ' ' + item.source.id}
        </p>
			)}
    </div>
  )
}

export default HomeFeedContainer
