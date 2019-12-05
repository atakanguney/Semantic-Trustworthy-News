var _ = require('lodash')

var Source = (module.exports = function (_node) {
  _.extend(this, {
    id: _node.properties['id'],
    name: _node.properties['name'],
    description: _node.properties['description'],
    url: _node.properties['url'],
    category: _node.properties['category'],
    language: _node.properties['language'],
    country: _node.properties['country']
  })
})
