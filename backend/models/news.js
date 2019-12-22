'use strict'

var slugify = require('slugify')
var News = require('../models/neo4j/news')
var Author = require('../models/neo4j/author')
var Source = require('../models/neo4j/source')
var NewsFetchHelper = require('../helpers/fetchExternalNews')

var _ = require('lodash')
var uuid = require('node-uuid')

var createNews = function ({ session, source, author, title, description, url, urlToImage, publishedAt, content }) {
  return session.run('MATCH (news:NewsArticle{title:{title}}) RETURN news', { title: title }).then(async response => {
    if (!_.isEmpty(response.records)) {
      return new News(response.records[0].get('news'))
    } else {
      var queries = [
        'MERGE (source:Source{id: {sourceId}, name: {sourceName}})',
        'MERGE (author:Author{id: {authorId}, personname: {authorName}})',
        'MERGE (news:NewsArticle {title: {title}, description: {description}, url: {url}, urlToImage: {urlToImage}, publishedAt: {publishedAt}, content: {content}, slug: {slug}})',
        'MERGE (news)-[:hasSource]->(source)',
        'MERGE (news)-[:isWrittenBy]->(author)',
        'MERGE (author)-[:hasWritten]->(news)',
        'RETURN news'
      ]
      return session
				.run(queries.join(' '), {
  sourceId: source['id'] || '',
  sourceName: source['name'] || '',
  authorId: uuid.v4(),
  authorName: author || '',
  title: title || '',
  description: description || '',
  url: url || '',
  urlToImage: urlToImage || '',
  publishedAt: publishedAt || '',
  content: content || '',
  slug: slugify(title) || ''
})
				.then(result => {
  session.close()
  return new News(result.records[0].get('news'))
})
    }
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

var allNews = function ({ session }) {
  var queries = [
    'MERGE (news: NewsArticle)',
    'MERGE (news)-[:isWrittenBy]->(author: Author)',
    'MERGE (news)-[:hasSource]->(source: Source)',
    'RETURN news, source, author'
  ]
  return session
		.run(queries.join(' '))
		.then(results => {
  return results.records.map(record => {
    return Object.assign(
					new News(record.get('news')),
					{ source: new Source(record.get('source')) },
					{ author: new Author(record.get('author')) }
				)
  })
})
		.catch(err => {
  console.log(err)
})
}

var updateNews = function (source, pageSize, language) {
  return NewsFetchHelper.fetchNews(source, pageSize, language, createNews)
}

module.exports = {
  createNews: createNews,
  getNewsBySlug: getNewsBySlug,
  allNews: allNews,
  updateNews: updateNews
}
