import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import NewsListItem from './news-list-item.component'
import { CardDeck } from 'react-bootstrap'
import { fetchNews } from '../../helpers/fetchNews'

const NewsList = () => {
  const [grouped, setGrouped] = useState([])

  const getNews = () => {
    fetchNews().then(res => {
      const grouped = res.data.reduce((acc, item, idx) => {
        const index = parseInt(idx / 3)
        acc[index] = acc[index] || []
        acc[index].push(<NewsListItem news={item} key={idx} />)
        return acc
      }, {})
      setGrouped(grouped)
    })
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <Container>
      {Object.entries(grouped).map(([key, itemList]) => {
        return (
          <Row className='mb-3' key={key}>
            <CardDeck className='mr-1'>
              {itemList}
            </CardDeck>
          </Row>
        )
      })}
    </Container>
  )
}

export default NewsList
