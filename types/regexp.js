/*
RegExp shell with custom methods
*/

// « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js

var regexp = require("../util/ghost").regexp

/*(regexp.escape)?*/
regexp.implement("escape", function(){
	return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
})/*:*/

module.exports = regexp
