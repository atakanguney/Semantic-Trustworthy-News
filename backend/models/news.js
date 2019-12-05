'use strict'

var sources = require('../models/sources')
var authors = require('../models/authors')
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

  console.log(_source)
  console.log(_author)

  var queries = [
    'MERGE (source:Source{id: {source_id}})',
    'MERGE (author:Author{id: {author_id}})',
    'CREATE (news:NewsArticle {title: {title}, description: {description}, url: {url}, urlToImage: {urlToImage}, publishedAt: {publishedAt}, content: {content}})',
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
  content: content
})
		.then(results => {
  return new News(results.records[0].get('news'))
})
}

module.exports = {
  createNews: createNews
}
