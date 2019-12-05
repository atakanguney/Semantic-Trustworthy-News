var _ = require('lodash')

var News = (module.exports = function (_node) {
  _.extend(this, {
    title: _node.properties['title'],
    description: _node.properties['description'],
    url: _node.properties['url'],
    urlToImage: _node.properties['urlToImage'],
    publishedAt: _node.properties['publishedAt'],
    content: _node.properties['content']
  })
})
