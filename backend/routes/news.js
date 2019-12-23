// users.js
var News = require('../models/gkgs'),
  writeResponse = require('../helpers/response').writeResponse,
  writeError = require('../helpers/response').writeError,
  loginRequired = require('../middlewares/loginRequired'),
  _ = require('lodash')

exports.index = function (req, res, next) {
  News.getAllGKGs()
		.then(results => {
  writeResponse(res, results, 201)
})
		.catch(next)
}

exports.updateNews = function (req, res, next) {
  News.updateNews()
		.then(result => {
  console.log(result)
  res.status(200).send()
})
		.catch(next)
}
