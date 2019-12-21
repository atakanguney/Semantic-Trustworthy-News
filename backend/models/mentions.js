var Mention = require('../models/graphdb/mention')
var dbUtils = require('../graphdb/dbUtils')
var utils = require('./utils')

var mentionGraph = 'ssw:stn:Mention'

var createMention = function (mention) {
	// Construct the query
  var query = utils
		.getSTNPrefix()
		.concat(['INSERT', 'DATA', '{', ':' + mention['GlobalEventID'], 'rdf:type', ':Mention'])
		.concat(utils.constructPredicatesAndObjects(mention))
		.concat(['.', '}'])
		.join(' ')

	// Construct the payload
  var payload = dbUtils.getUpdateQueryPayload(mentionGraph).setQuery(query)

	// Get repository
  var repository = dbUtils.getRepository()

	// Make the request

  return repository.update(payload).then(() => {
    console.log('Mention Created Successfully')
  })
}

var getMentionByGlobalEventID = function (globalEventId) {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  '?p',
  '?o',
  'WHERE',
  '{',
  '?s',
  ':hasGlobalEventID',
  '"' + globalEventId + '"',
  '.',
  '?s',
  '?p',
  '?o',
  '.',
  '}'
])
		.join(' ')
	// Get repository
  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())
	// Construct the payload
  var payload = dbUtils
		.getQueryPayload()
		.setQuery(query)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)
		.setLimit(100)
	// Make the request
  return repository.query(payload).then(stream => {
    var results = []

    var promise = new Promise((resolve, reject) => {
      stream.on('data', bindings => {
        results.push(bindings)
      })
      stream.on('error', reject)
      stream.on('end', () => {
        resolve(new Mention(utils.extractResults(results)))
      })
    })
    return promise
  })
}

var getAllMentions = function () {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  'DISTINCT',
  '?globalEventId',
  'WHERE',
  '{',
  '?s',
  'rdf:type',
  ':Mention',
  ';',
  ':hasGlobalEventID',
  '?globalEventId',
  '.',
  '}'
])
		.join(' ')

  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())

  var payload = dbUtils
		.getQueryPayload()
		.setQuery(query)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)

  return repository.query(payload).then(stream => {
    var results = []
    return new Promise((resolve, reject) => {
      stream.on('data', bindings => results.push(bindings))
      stream.on('error', reject)
      stream.on('end', () => resolve(results.map(item => JSON.parse(item['globalEventId']['id']))))
    }).then(eventIds => {
      var eventPromises = []
      eventIds.forEach(element => {
        eventPromises.push(getMentionByGlobalEventID(element))
      })

      return Promise.all(eventPromises)
    })
  })
}

module.exports = {
  createMention: createMention,
  getMentionByGlobalEventID: getMentionByGlobalEventID,
  getAllMentions: getAllMentions
}
