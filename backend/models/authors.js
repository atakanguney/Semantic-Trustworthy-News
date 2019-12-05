'use strict'
var uuid = require('node-uuid')
var Author = require('../models/neo4j/author')
var _ = require('lodash')

var createAuthor = function (session, name) {
  return session
		.run('MATCH (a: Author {personname: {name}}) RETURN a', {
  name: name
})
		.then(response => {
  if (!_.isEmpty(response.records)) {
    return new Author(response.records[0].get('a'))
  } else {
    return session
					.run('CREATE (a: Author {id: {id}, personname: {name}}) RETURN a', {
  id: uuid.v4(),
  name: name
})
					.then(results => {
  return new Author(results.records[0].get('a'))
})
  }
})
}

module.exports = {
  createAuthor: createAuthor
}
