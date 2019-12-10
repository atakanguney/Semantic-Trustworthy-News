'use strict'

var sources = require('../models/sources')
var authors = require('../models/authors')
var slugify = require('slugify')
var News = require('../models/neo4j/news')

var createNews = async function ({
	session,
	source,
	author,
	title,
	description,
	url,
	urlToImage,
	publishedAt,
	content
}) {
  var _source = await sources.createSource({ session: session, id: source['id'], name: source['name'] })
  var _author = await authors.createAuthor(session, author)

  var queries = [
    'MERGE (source:Source{id: {source_id}})',
    'MERGE (author:Author{id: {author_id}})',
    'CREATE (news:NewsArticle {title: {title}, description: {description}, url: {url}, urlToImage: {urlToImage}, publishedAt: {publishedAt}, content: {content}, slug: {slug}})',
    'CREATE (news)-[:hasSource]->(source)',
    'CREATE (news)-[:isWrittenBy]->(author)',
    'CREATE (author)-[:hasWritten]->(news)',
    'RETURN news'
  ]
  return session
		.run(queries.join(' '), {
  source_id: _source['id'],
  author_id: _author['id'],
  title: title,
  description: description,
  url: url,
  urlToImage: urlToImage,
  publishedAt: publishedAt,
  content: content,
  slug: slugify(title)
})
		.then(results => {
  return new News(results.records[0].get('news'))
})
}

var getNewsBySlug = function ({ session, slug }) {
  return session.run('MATCH (news: NewsArticle{slug: {slug}}) RETURN news', { slug: slug }).then(results => {
    if (results.records.length > 0) {
      return new News(results.records[0].get(['news']))
    } else {
      return null
    }
  })
}

module.exports = {
  createNews: createNews,
  getNewsBySlug: getNewsBySlug
}
