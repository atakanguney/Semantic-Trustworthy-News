var GKG = require('../models/graphdb/gkg')
var dbUtils = require('../graphdb/dbUtils')
var utils = require('./utils')
var fetchGDELTHelper = require('../helpers/fetchGDELTNews')

var gkgGraph = 'ssw:stn:GKG'

var createGKG = function (gkg) {
	// Construct the query
  var query = utils
		.getSTNPrefix()
		.concat(['INSERT', 'DATA', '{', ':' + gkg['GKGRECORDID'], 'rdf:type', ':GKG'])
		.concat(utils.constructPredicatesAndObjects(gkg))
		.concat(['.', '}'])
		.join(' ')

	// Construct the payload
  var payload = dbUtils.getUpdateQueryPayload(gkgGraph).setQuery(query)

	// Get repository
  var repository = dbUtils.getRepository()

	// Make the request
  return repository.update(payload).then(() => {
    console.log('GKG Record Created Successfully')
  })
}

var getGKGByGKGRECORDID = function (gkgRecordId) {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  '?p',
  '?o',
  'WHERE',
  '{',
  '?s',
  'ont:hasGKG_ID',
  '"' + gkgRecordId + '"',
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

var getAllGKGs = function () {
  var query = utils
		.getSTNPrefix()
		.concat([
  'SELECT',
  'DISTINCT',
  '?gkgRecordId',
  'WHERE',
  '{',
  '?s',
  'rdf:type',
  'ont:NewsArticle',
  ';',
  'ont:hasTrustLevel',
  '?t',
  ';',
  'ont:hasPublishDate',
  '?date',
  ';',
  'ont:hasGKG_ID',
  '?gkgRecordId',
  '.',
  '}',
  'ORDER',
  'BY',
  'DESC(?date)'
])
		.join(' ')

  var repository = dbUtils.getRepository()
  repository.registerParser(dbUtils.getJSONParser())

  var payload = dbUtils
		.getQueryPayload()
		.setQuery(query)
		.setQueryType(dbUtils.getQueryTypes().SELECT)
		.setResponseType(dbUtils.getRDFMimeType().SPARQL_RESULTS_JSON)
		.setLimit(200)

  return repository.query(payload).then(stream => {
    var results = []
    return new Promise((resolve, reject) => {
      stream.on('data', bindings => results.push(bindings))
      stream.on('error', reject)
      stream.on('end', () => resolve(results.map(item => JSON.parse(item['gkgRecordId']['id']))))
    }).then(eventIds => {
      var eventPromises = []
      eventIds.forEach(element => {
        eventPromises.push(getGKGByGKGRECORDID(element))
      })

      return Promise.all(eventPromises)
    })
  })
}

var updateNews = function () {
  return fetchGDELTHelper.uploadRDFToGraphDB().then(res => {
    if (res) {
      return fetchGDELTHelper.uploadTrustMetrics()
    }
    return res
  })
}

module.exports = {
  createGKG: createGKG,
  getGKGByGKGRECORDID: getGKGByGKGRECORDID,
  getAllGKGs: getAllGKGs,
  updateNews: updateNews
}
