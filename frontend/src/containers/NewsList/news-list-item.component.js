import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CardTitle } from './news-list-item.style'

const NewsListItem = props => {
  const { source, author, title, description, url, urlToImage, slug } = props.news

  return (
    <Card>
      <Link to={`/news/${slug}`}>
        <Card.Img variant='top' src={urlToImage} />
      </Link>
      <CardTitle>
        {title}
      </CardTitle>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>
          {author.personname + ', ' + source.name}
        </Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={url}>Original source</Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default NewsListItem
