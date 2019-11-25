'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const data = require('./handlers/data')
const userRoutes = require('./routes/users')

module.exports = function (app, opts) {
	// Setup routes, middleware, and handlers
  app.get('/api', simple)
  app.get('/api/configured', configured(opts))
  app.get('/api/data', data)
  app.post('/api/register', userRoutes.register)
  app.post('/api/login', userRoutes.login)
  app.get('/api/users/me', userRoutes.me)
}
