var _ = require('lodash')
var fields = require('../../helpers/fetchGDELTNews').eventFields

var Event = (module.exports = function (_node) {
  _.extend(
		this,
		fields.reduce((obj, x) => {
  obj[x] = _node[x]
  return obj
}, {})
	)
})
