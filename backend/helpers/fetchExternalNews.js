'use strict'

require('dotenv').config()
const dbUtils = require('../neo4j/dbUtils')
const News = require('../models/news')

const fs = require('fs')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('API_KEY')

newsapi.v2
	.everything({
  language: 'en',
  pageSize: 100,
  sources: 'the-new-york-times'
})
	.then(async response => {
  const articles = response['articles'].map(article => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async function () {
        await News.createNews({ session: dbUtils.getSession({}), ...article })
        resolve()
      }, 10)
    })
  })
  const status = await Promise.all(articles)
})
