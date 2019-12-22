var _ = require('lodash')
var fields = require('../../helpers/fetchGDELTNews').gkgFields

var GKG = (module.exports = function (_node) {
  _.extend(
		this,
		fields.reduce((obj, x) => {
  obj[x] = _node[x]
  return obj
}, {})
	)
})
