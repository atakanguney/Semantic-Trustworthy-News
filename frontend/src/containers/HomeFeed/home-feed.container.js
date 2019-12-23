import React, { useEffect, useState } from 'react'
import NewsList from '../NewsList'
import { Title, CenterContainer } from './home-feed.style'
import { fetchNews, updateNews } from '../../helpers/fetchNews'
import { Button, Container } from 'react-bootstrap'

const HomeFeedContainer = () => {
  const [newsList, setNewsList] = useState([])
  const [newsUpdated, setNewsUpdated] = useState(false)

  const getNews = () => {
    fetchNews().then(res => {
      console.log(res.data)
      setNewsList(res.data)
    })
  }

  const fetchNewsFromAPI = () => {
    updateNews()
			.then(res => {
  if (res && res.status == 200) {
    setNewsUpdated(!newsUpdated)
  }
})
			.catch(err => {
  console.log(err)
})
  }

  useEffect(
		() => {
  getNews()
},
		[newsUpdated]
	)

  return (
    <Container>
      <Title className='mt-1'>Semantic Trustworthy News</Title>
      <CenterContainer className='mt-1 mb-2'>
        <Button variant='primary' onClick={fetchNewsFromAPI} size='lg'>
					Fetch News
				</Button>
      </CenterContainer>
      {<NewsList newsList={newsList} />}
    </Container>
  )
}

export default HomeFeedContainer
