import React, { useState, useEffect } from 'react'
import { getNewsBySlug } from '../../helpers/fetchNews'
import { Container, Image } from 'react-bootstrap'
import { NewsTitle, NewsLink } from './news-item.style'

const NewsItem = ({ match }) => {
  const slug = match.params['slug']

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [publishedAt, setPublishedAt] = useState('')
  const [url, setUrl] = useState('')
  const [urlToImage, setUrlToImage] = useState('')

  useEffect(
		() => {
  getNewsBySlug(slug)
				.then(result => {
  console.log(result)
  setTitle(result.title)
  setContent(result.content)
  setDescription(result.description)
  setPublishedAt(result.publishedAt)
  setUrl(result.url)
  setUrlToImage(result.urlToImage)
})
				.catch(err => {
  console.log(err)
})
},
		[slug]
	)

  return (
    <Container>
      <NewsTitle>
        {title}
      </NewsTitle>
      <p>
        {description}
      </p>
      <p>
        {content}
      </p>
      <p>
        <b>Published At: </b>
        {publishedAt}
      </p>
      <NewsLink href={url}>Original Source</NewsLink>
      <Image src={urlToImage} />
    </Container>
  )
}

export default NewsItem
