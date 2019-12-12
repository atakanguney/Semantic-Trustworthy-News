import React from 'react'

import { Card } from 'react-bootstrap'
const NewsListItem = props => {
  const { source, author, title, description, url, urlToImage, publishedAt, content } = props.news

  return (
    <Card>
      <Card.Title style={{ 'text-align': 'center' }}>
        {title}
      </Card.Title>
      <Card.Img variant='top' src={urlToImage} />
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>
          {author + ', ' + source.name}
        </Card.Subtitle>
        <Card.Text>
          {content}
        </Card.Text>
        <Card.Link href='#'>Detail</Card.Link>
        <Card.Link href={url}>Original source</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default NewsListItem
