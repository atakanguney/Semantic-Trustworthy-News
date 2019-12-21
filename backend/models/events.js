var Event = require('../models/graphdb/event')
var fields = require('../helpers/fetchGDELTNews').eventFields
var dbUtils = require('../graphdb/dbUtils')

var eventGraph = 'ssw:stn:Events'

var createEvent = function (event) {
	// Construct the query
  var query = [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'INSERT',
    'DATA',
    '{',
    ':' + event['GlobalEventID'],
    'rdf:type',
    ':Event'
  ]
		.concat(
			Object.entries(event)
				.map(([key, val]) => {
  return [';', ':has' + key, '"' + val + '"']
})
				.reduce((obj, x) => {
  return obj.concat(x)
}, [])
		)
		.concat(['.', '}'])
		.join(' ')

  console.log(query)
	// Construct the payload

  var payload = dbUtils.getUpdateQueryPayload(eventGraph).setQuery(query)

	// Get repository
  var repository = dbUtils.getRepository()

	// Make the request

  return repository.update(payload).then(() => {
    console.log('Event Created Successfully')
  })
}

module.exports = {
  createEvent: createEvent
}
