var _ = require('lodash')

var User = (module.exports = function (_node) {
  _.extend(this, {
    id: _node['id'],
    username: _node['name'],
    apikey: _node['apikey'],
    password: _node['password']
  })
})
