var News = require('../models/news'),
  writeResponse = require('../helpers/response').writeResponse,
  writeError = require('../helpers/response').writeError,
  loginRequired = require('../middlewares/loginRequired'),
  dbUtils = require('../neo4j/dbUtils'),
  _ = require('lodash')

var slugify = require('slugify')

exports.createNews = function (req, res, next) {
  loginRequired(req, res, () => {
    var source = {
      id: slugify(_.get(req.body, 'source')),
      name: _.get(req.body, 'source')
    }
    var author = _.get(req.body, 'author')
    var title = _.get(req.body, 'title')
    var description = _.get(req.body, 'description')
    var url = _.get(req.body, 'url')
    var urlToImage = _.get(req.body, 'urlToImage')
    var publishedAt = _.get(req.body, 'publishedAt')
    var content = _.get(req.body, 'content')

    if (!title) {
      throw { title: 'This field is required.', status: 400 }
    }
    if (!content) {
      throw { content: 'This field is required.', status: 400 }
    }
    if (!description) {
      throw { description: 'This field is required.', status: 400 }
    }

    News.createNews({
      session: dbUtils.getSession(req),
      source: source,
      author: author,
      title: title,
      description: description,
      url: url,
      urlToImage: urlToImage,
      publishedAt: publishedAt,
      content: content
    })
			.then(response => writeResponse(res, response, 201))
			.catch(next)
  })
}

exports.allNews = function (req, res, next) {
  News.allNews({
    session: dbUtils.getSession(req)
  })
		.then(response => writeResponse(res, response, 200))
		.catch(next)
}

exports.getNewsBySlug = function (req, res, next) {
  var slug = req.params.slug

  if (!slug) {
    throw { title: 'This field is required.', status: 400 }
  }

  News.getNewsBySlug({ session: dbUtils.getSession(req), slug: slug })
		.then(response => writeResponse(res, response, 200))
		.catch(next)
}
