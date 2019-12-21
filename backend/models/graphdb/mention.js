var _ = require('lodash')
var fields = require('../../helpers/fetchGDELTNews').mentionsFields

var Mention = (module.exports = function (_node) {
  _.extend(
		this,
		fields.reduce((obj, x) => {
  obj[x] = _node[x]
  return obj
}, {})
	)
})
