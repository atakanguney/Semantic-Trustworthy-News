'use-strict'

const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
		proxy('/api/login', {
  target: 'http://localhost:8000',
  secure: false,
  changeOrigin: true
})
	)
}
