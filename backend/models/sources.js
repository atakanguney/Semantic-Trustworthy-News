'use strict'
var Source = require('../models/neo4j/source')
var _ = require('lodash')

var createSource = function ({
	session,
	id,
	name,
	description = '',
	url = '',
	category = '',
	language = '',
	country = ''
}) {
  return session.run('MATCH (source:Source {id: {id}}) RETURN source', { id: id }).then(response => {
    if (!_.isEmpty(response.records)) {
      return new Source(response.records[0].get('source'))
    } else {
      return session
				.run(
					'CREATE (source:Source {id: {id}, name: {name}, description: {description}, url: {url}, category: {category}, language: {language}, country: {country}}) RETURN source',
        {
          id: id,
          name: name,
          description: description,
          url: url,
          category: category,
          language: language,
          country: country
        }
				)
				.then(results => {
  return new Source(results.records[0].get('source'))
})
				.catch({})
    }
  })
}

module.exports = {
  createSource: createSource
}
