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
    let key = item[predicate]['id'].split('/').pop()
    if (key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].push(
					item[object]['id'].match(/"(.*?)"/) !== null ? item[object]['id'].match(/"(.*?)"/)[1] : ''
				)
      } else {
        obj[key] = [
          obj[key],
          item[object]['id'].match(/"(.*?)"/) !== null ? item[object]['id'].match(/"(.*?)"/)[1] : ''
        ]
      }
    } else {
      obj[key] = item[object]['id'].match(/"(.*?)"/) !== null ? item[object]['id'].match(/"(.*?)"/)[1] : ''
    }

    return obj
  }, {})
}
module.exports = {
  constructPredicatesAndObjects: constructPredicatesAndObjects,
  getSTNPrefix: getSTNPrefix,
  extractResults: extractResults
}
