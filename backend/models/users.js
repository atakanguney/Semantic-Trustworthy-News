'use strict'

var uuid = require('node-uuid')
var randomstring = require('randomstring')
var _ = require('lodash')
var User = require('../models/graphdb/user')
var crypto = require('crypto')
var dbUtils = require('../graphdb/dbUtils')
var pino = require('pino')

var logger = pino()
var userGraph = 'ssw:stn:Users'

var register = function (username, password) {
  var askQuery = [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'PREFIX',
    'foaf:',
    '<http://xmlns.com/foaf/0.1/>',
    'ASK',
    '{',
    '?s',
    'foaf:name',
    '"' + username + '"',
    '}'
  ].join(' ')

  var askPayload = dbUtils
		.getQueryPayload()
		.setQuery(askQuery)
		.setQueryType(dbUtils.getQueryTypes().ASK)
		.setResponseType(dbUtils.getRDFMimeType().BOOLEAN_RESULT)

	// Get Repository
  var repository = dbUtils.getRepository()

  repository.registerParser(dbUtils.getJSONParser())

  return repository.query(askPayload).then(data => {
		// console.log(data)
    var promise = new Promise((resolve, reject) => {
      data.on('data', d => {
        resolve(d.toString() == 'true')
      })
    })

    return promise.then(res => {
      if (res) {
        return getUserByUsername(username)
      } else {
				// Construct Query
        var query = [
          'PREFIX',
          ':',
          '<http://www.stnews.com/>',
          'PREFIX',
          'rdf:',
          '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>',
          'PREFIX',
          'foaf:',
          '<http://xmlns.com/foaf/0.1/>',
          'INSERT',
          'DATA',
          '{',
          ':' + username,
          'rdf:type',
          ':User',
          ';',
          'foaf:name',
          '"' + username + '"',
          ';',
          ':hasId',
          '"' + uuid.v4() + '"',
          ';',
          ':hasPassword',
          '"' + hashPassword(username, password) + '"',
          ';',
          ':hasAPIKey',
          '"' + randomstring.generate({ length: 20, charset: 'hex' }) + '"',
          '.',
          '}'
        ].join(' ')

        logger.info('[QUERY]: ' + query)

				// Construct Payload
        var payload = dbUtils.getUpdateQueryPayload(userGraph).setQuery(query)

				// Store in Database
        return repository
					.update(payload)
					.then(() => {
  logger.info('User Stored Successfully')
  return getUserByUsername(username)
})
					.catch(err => {
  console.log(err.response.data)
  throw err
})
      }
    })
  })
}

var getUserById = function (userId) {
  var selectQuery = [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'PREFIX',
    'foaf:',
    '<http://xmlns.com/foaf/0.1/>',
    'SELECT',
    '?id',
    '?name',
    '?apikey',
    'WHERE',
    '{',
    '?p',
    'foaf:name',
    '?name',
    ';',
    ':hasAPIKey',
    '?apikey',
    ';',
    ':hasId',
    '?id',
    ';',
    ':hasId',
    '"' + userId + '"',
    '.',
    '}'
  ].join(' ')

  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())

  var selectPayload = dbUtils
		.getQueryPayload()
		.setQuery(selectQuery)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)
		.setLimit(100)

  return repository.query(selectPayload).then(stream => {
    var results = []

    return new Promise((resolve, reject) => {
      stream.on('data', bindings => {
        results.push(bindings)
      })
      stream.on('error', reject)
      stream.on('end', () => {
        if (results.length > 0) {
          var user = new User(results[0])
          resolve(user)
        } else {
          resolve(null)
        }
      })
    })
  })
}

var getUserByUsername = function (username) {
  var selectQuery = [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'PREFIX',
    'foaf:',
    '<http://xmlns.com/foaf/0.1/>',
    'SELECT',
    '?id',
    '?name',
    '?apikey',
    '?password',
    'WHERE',
    '{',
    '?p',
    'foaf:name',
    '"' + username + '"',
    ';',
    ':hasAPIKey',
    '?apikey',
    ';',
    ':hasId',
    '?id',
    ';',
    'foaf:name',
    '?name',
    ';',
    ':hasPassword',
    '?password',
    '.',
    '}'
  ].join(' ')

  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())

  var selectPayload = dbUtils
		.getQueryPayload()
		.setQuery(selectQuery)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)
		.setLimit(100)

  return repository.query(selectPayload).then(stream => {
    var results = []

    return new Promise((resolve, reject) => {
      stream.on('data', bindings => {
        Object.keys(bindings).map(key => {
          bindings[key] = JSON.parse(bindings[key]['id'])
        })
        results.push(bindings)
      })
      stream.on('error', reject)
      stream.on('end', () => {
        if (results.length > 0) {
          var user = new User(results[0])
          resolve(user)
        } else {
          resolve(null)
        }
      })
    })
  })
}

var me = function (apiKey) {
	// Construct Query
  var query = [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'PREFIX',
    'foaf:',
    '<http://xmlns.com/foaf/0.1/>',
    'SELECT',
    '?name',
    '?id',
    'WHERE',
    '{',
    '?p',
    'foaf:name',
    '?name',
    ';',
    ':hasAPIKey',
    '"' + apiKey + '"',
    ';',
    ':hasId',
    '?id',
    '.',
    '}'
  ]

  console.log(query)
	// Construct Payload
  var payload = dbUtils.getQueryPayload(userGraph).setQuery(query).setQueryType(dbUtils.getQueryTypes().SELECT)
	// Get Repository
  var repository = dbUtils.getRepository()
	// Get User
  return repository.get(payload).then(result => {
    console.log(result)
  })
}

var login = function (username, password) {
  return getUserByUsername(username).then(result => {
    if (result) {
      if (result.password != hashPassword(username, password)) {
        throw { password: 'wrong password', status: 400 }
      }
      return { token: result['apikey'] }
    } else {
      throw { username: 'username does not exist', status: 400 }
    }
  })
}

function hashPassword (username, password) {
  var s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

module.exports = {
  register: register,
  me: me,
  login: login
}
