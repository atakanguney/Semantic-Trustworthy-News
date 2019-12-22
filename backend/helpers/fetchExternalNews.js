'use strict'
var nconf = require('../config/config')['newsapi']

var NewsAPI = require('newsapi')
var dbUtils = require('../neo4j/dbUtils')
var newsapi = new NewsAPI(nconf.apikey)

exports.fetchNews = function (source, pageSize, language, createNews) {
  return newsapi.v2
		.everything({
  language: language,
  pageSize: pageSize,
  sources: source
})
		.then(response => {
  var articles = response['articles'] || []

  for (let article of articles) {
    createNews({ session: dbUtils.getSession({}), ...article })
  }
  return true
})
		.catch(err => {
  console.log(err)
  return false
})
}
