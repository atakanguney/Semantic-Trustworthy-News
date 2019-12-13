import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NewsListItem from './news-list-item.component'
import { CardDeck, CardGroup } from 'react-bootstrap'

const NewsList = props => {
  const { newsList } = props

  const grouped = newsList.reduce((acc, item, idx) => {
    const index = parseInt(idx / 3)
    acc[index] = acc[index] || []
    acc[index].push(<NewsListItem news={item} />)
    return acc
  }, {})

  return (
    <Container>
      {Object.entries(grouped).map(([key, itemList]) => {
        return (
          <Row className='mb-3'>
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
