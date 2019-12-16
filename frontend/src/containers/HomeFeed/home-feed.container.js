import React from 'react'
import NewsList from '../NewsList'
import { Title } from './home-feed.style'

const HomeFeedContainer = () => {
  return (
    <div>
      <Title>Semantic Trustworthy News</Title>
      {<NewsList />}
    </div>
  )
}

export default HomeFeedContainer
