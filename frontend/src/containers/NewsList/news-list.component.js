import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NewsListItem from './news-list-item.component'

const NewsList = props => {
  const { newsList } = props

  const grouped = newsList.reduce((acc, item, idx) => {
    const index = parseInt(idx / 3)
    acc[index] = acc[index] || []
    acc[index].push(
      <Col>
        <NewsListItem news={item} />
      </Col>
		)
    return acc
  }, {})

  return (
    <Container>
      {Object.entries(grouped).map(([key, itemList]) => {
        return (
          <Row>
            {itemList}
          </Row>
        )
      })}
    </Container>
  )
}

export default NewsList
