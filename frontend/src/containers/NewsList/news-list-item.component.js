import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CardTitle } from './news-list-item.style'
import { Icon, Button } from 'semantic-ui-react'

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
          {Array.isArray(hasTrustLevel)
						? hasTrustLevel.map(item => parseFloat(item)).reduce((acc, x) => acc + x, 0) /
							hasTrustLevel.length
						: 0}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={hasArticleURL}>Original source</Card.Link>
        <Button style={{ float: 'right' }}>
          <Icon name='thumbs down' />
					Don't
				</Button>
        <Button style={{ float: 'right' }}>
          <Icon name='thumbs up' />
					Trust
				</Button>
      </Card.Footer>
    </Card>
  )
}

export default NewsListItem
