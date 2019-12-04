var _ = require('lodash')
var md5 = require('md5')

var User = (module.exports = function (_node) {
  var username = _node.properties['username']

  _.extend(this, {
    id: _node.properties['id'],
    username: username,
    avatar: {
      'full-size': 'https://www.gravatar.com/avatar/' + md5(username) + '?d=retro'
    }
  })
})
