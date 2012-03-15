/*
RegExp shell with custom methods
*/

var regexp = require("../util/shell")(require("../es5/regexp")).implement({

	/*(regexp.escape)?*/
	// « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js
	escape: function(){
		return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
	}/*:*/

})

module.exports = regexp
