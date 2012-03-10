/*
RegExp pod with custom methods
*/

// « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js

module.exports = require("../")(require("../regexp")).implement("escape", function(){
	return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
})
