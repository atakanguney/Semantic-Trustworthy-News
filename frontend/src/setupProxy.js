'use-strict'

require('dotenv').config()
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
		proxy('/api', {
  target:
				process.env.API_HOST && process.env.API_PORT
					? `${process.env.API_HOST}:${process.env.API_PORT}`
					: 'http://localhost:8000',
  changeOrigin: true
})
	)
}
