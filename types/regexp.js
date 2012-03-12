/*
RegExp shell with custom methods
*/

// « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js

var regexp = require("../util/shell")(RegExp)

regexp.implement({

	//=regexp.escape
	escape: function(){
		return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
	},//.
	
	//=regexp.type
	type: function(){
		return "regexp"
	}//.
	
})
	

module.exports = regexp
