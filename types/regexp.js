/*
RegExp methods
*/"use strict"

var shell = require("../util/shell"),
	_regexp = require("../es5/regexp")

var regexp = shell({

	inherits: _regexp,

	/*(regexp.escape)?*/
	// « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js
	escape: function(){
		return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
	}/*:*/

})

module.exports = regexp
