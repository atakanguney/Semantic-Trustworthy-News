'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const data = require('./handlers/data')
const userRoutes = require('./routes/users')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.post('/register', userRoutes.register)
  app.post('/login', userRoutes.login)
  app.get('/users/me', userRoutes.me)
}
