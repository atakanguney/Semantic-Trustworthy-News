'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const data = require('./handlers/data')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/configured', configured(opts))
  app.get('/data', data)
}
