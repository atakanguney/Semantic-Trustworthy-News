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
  return ['PREFIX', ':', '<http://www.stnews.com/>']
}

var extractResults = function (results, predicate = 'p', object = 'o') {
  return results.slice(1).reduce((obj, item) => {
    obj[item[predicate]['id'].split('/').pop().slice(3)] = JSON.parse(item[object]['id'])
    return obj
  }, {})
}
module.exports = {
  constructPredicatesAndObjects: constructPredicatesAndObjects,
  getSTNPrefix: getSTNPrefix,
  extractResults: extractResults
}
