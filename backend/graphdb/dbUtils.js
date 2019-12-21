const { ServerClient, ServerClientConfig } = require('graphdb').server
const { RDFMimeType, QueryContentType } = require('graphdb').http
const { RDFRepositoryClient, RepositoryClientConfig } = require('graphdb').repository
const { GetStatementsPayload } = require('graphdb').repository
const { UpdateQueryPayload, GetQueryPayload, QueryType } = require('graphdb').query
const { SparqlJsonResultParser, SparqlXmlResultParser } = require('graphdb').parser

const serverConfig = new ServerClientConfig('http://graphdb:7200', 0, {
  Accept: RDFMimeType.JSON_LD
})

exports.getServerClient = function () {
  return new ServerClient(serverConfig)
}

exports.getRepository = function (repository = 'STN') {
  const readTimeout = 30000
  const writeTimeout = 30000
  const config = new RepositoryClientConfig(
		[`http://graphdb:7200/repositories/${repository}`],
    {
      Accept: RDFMimeType.JSON_LD
    },
		'',
		readTimeout,
		writeTimeout
	)
  return new RDFRepositoryClient(config)
}

exports.getStatementsPayload = function () {
  return new GetStatementsPayload().setResponseType(RDFMimeType.JSON_LD).setInference(true)
}

exports.getUpdateQueryPayload = function (graph = '') {
  return new UpdateQueryPayload()
		.setInsertGraphs(graph)
		.setContentType(QueryContentType.X_WWW_FORM_URLENCODED)
		.setInference(true)
		.setTimeout(5)
}

exports.getQueryPayload = function () {
  return new GetQueryPayload()
}

exports.getRDFMimeType = function () {
  return RDFMimeType
}

exports.getQueryTypes = function () {
  return QueryType
}

exports.getJSONParser = function () {
  return new SparqlJsonResultParser()
}

exports.getXMLParser = function () {
  return new SparqlXmlResultParser()
}
// const elements = [
//   {
//     subject: 'Atakan',
//     predicate: 'hasPassword',
//     object: 1234567869
//   }
// ]

// let payload = this.getUpdateQueryPayload('ssw:stn:Authors', elements)
// const repository = this.getRepository()

// repository.update(payload).then(() => {})

// payload = new GetStatementsPayload()
// 	.setResponseType(RDFMimeType.JSON_LD)
// 	.setContext('Authors')
// 	.setSubject('http://stnews.com/Atakan')
// 	.setPredicate('http://stnews.com/hasPassword')
// 	.setInference(true)

// repository.get(payload).then(data => {
//   console.log(data)
// })
