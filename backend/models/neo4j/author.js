var _ = require('lodash')

var Author = (module.exports = function (_node) {
  _.extend(this, {
    id: _node.properties['id'],
    personname: _node.properties['personname']
  })
})
