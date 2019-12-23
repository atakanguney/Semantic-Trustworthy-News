var Event = require('../models/graphdb/event')
var dbUtils = require('../graphdb/dbUtils')
var utils = require('./utils')

var eventGraph = 'ssw:stn:Events'

var createEvent = function (event) {
	// Construct the query
  var query = utils
		.getSTNPrefix()
		.concat(['INSERT', 'DATA', '{', ':' + event['GlobalEventID'], 'rdf:type', ':Event'])
		.concat(utils.constructPredicatesAndObjects(event))
		.concat(['.', '}'])
		.join(' ')

	// Construct the payload

  var payload = dbUtils.getUpdateQueryPayload(eventGraph).setQuery(query)

	// Get repository
  var repository = dbUtils.getRepository()

	// Make the request

  return repository.update(payload).then(() => {
    console.log('Event Created Successfully')
  })
}

var getEventByEventId = function (eventId) {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  '?p',
  '?o',
  'WHERE',
  '{',
  '?s',
  'ont:hasGlobalEventID',
  '"' + eventId + '"',
  '.',
  '?s',
  'rdf:type',
  'ont:Event',
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
        resolve(utils.extractResults(results))
      })
    })
    return promise
  })
}

var getAllEvents = function () {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  'DISTINCT',
  '?eventId',
  'WHERE',
  '{',
  '?s',
  'rdf:type',
  'ont:Event',
  ';',
  'ont:hasGlobalEventID',
  '?eventId',
  '.',
  '}'
])
		.join(' ')

  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())
  console.log(query)
  var payload = dbUtils
		.getQueryPayload()
		.setQuery(query)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)
		.setLimit(100)

  return repository.query(payload).then(stream => {
    var results = []
    return new Promise((resolve, reject) => {
      stream.on('data', bindings => results.push(bindings))
      stream.on('error', reject)
      stream.on('end', () => resolve(results.map(item => JSON.parse(item['eventId']['id']))))
    }).then(eventIds => {
      var eventPromises = []
      eventIds.forEach(element => {
        eventPromises.push(getEventByEventId(element))
      })

      return Promise.all(eventPromises)
    })
  })
}

module.exports = {
  createEvent: createEvent,
  getEventByEventId: getEventByEventId,
  getAllEvents: getAllEvents
}
