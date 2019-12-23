import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NewsListItem from './news-list-item.component'
import { CardDeck } from 'react-bootstrap'

const NewsList = props => {
  const { newsList } = props

  const grouped = newsList
		? newsList.reduce((acc, item, idx) => {
  const index = parseInt(idx / 3)
  acc[index] = acc[index] || []
  acc[index].push(
					// <Col md={4}>
    <NewsListItem news={item} key={idx} />
					// </Col>
				)
  return acc
}, {})
		: {}

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
