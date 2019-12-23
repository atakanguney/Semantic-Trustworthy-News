var constructPredicatesAndObjects = function (obj) {
  return Object.entries(obj)
		.map(([key, val]) => {
  return [';', ':has' + key, '"' + val + '"']
})
		.reduce((obj, x) => {
  return obj.concat(x)
}, [])
}

var getSTNPrefix = function () {
  return [
    'PREFIX',
    ':',
    '<http://www.stnews.com/>',
    'PREFIX',
    'ont:',
    '<https://github.com/atakanguney/Semantic-Trustworthy-News/blob/master/ontology/trustworthy-news.owl/>'
  ]
}

var extractResults = function (results, predicate = 'p', object = 'o') {
  return results.reduce((obj, item) => {
    obj[item[predicate]['id'].split('/').pop()] =
			item[object]['id'].match(/"(.*?)"/) !== null ? item[object]['id'].match(/"(.*?)"/)[1] : '' // JSON.parse(item[object]['id'])
    return obj
  }, {})
}
module.exports = {
  constructPredicatesAndObjects: constructPredicatesAndObjects,
  getSTNPrefix: getSTNPrefix,
  extractResults: extractResults
}
