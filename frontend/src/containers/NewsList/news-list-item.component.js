import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CardTitle } from './news-list-item.style'

const NewsListItem = props => {
  const {
		hasSourceCommonName,
		hasPublishDate,
		hasPositiveScore,
		hasPolarity,
		hasNegativeScore,
		hasImageURL,
		hasGKG_ID,
		hasArticleURL,
		hasThemes,
		hasTitle,
		hasTone,
		hasVideoURLs,
		hasTrustLevel
	} = props.news
  const imgStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
		// width: '15vw',
    height: '15vw',
    objectFit: 'cover'
  }
  const cardStyle = { width: '25vw', flex: 1 }
  return (
    <Card>
      <Link to={`/news/${hasGKG_ID}`}>
        <Card.Img variant='top' style={imgStyle} src={hasImageURL} />
      </Link>
      <CardTitle>
        {hasTitle}
      </CardTitle>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>
          {hasSourceCommonName}
        </Card.Subtitle>
        <Card.Text>
          {hasTrustLevel}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={hasArticleURL}>Original source</Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default NewsListItem
