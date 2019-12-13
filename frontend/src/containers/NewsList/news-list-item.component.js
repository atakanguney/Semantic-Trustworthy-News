import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NewsListItem = props => {
  const { source, author, title, description, url, urlToImage, publishedAt, content, slug } = props.news

  return (
    <Card>
      <Link to={`/news/${slug}`}>
        <Card.Img variant='top' src={urlToImage} />
      </Link>
      <Card.Title style={{ 'text-align': 'center' }}>
        {title}
      </Card.Title>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>
          {author + ', ' + source.name}
        </Card.Subtitle>
        <Card.Text>
          {content}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={url}>Original source</Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default NewsListItem
