/*
Function methods
*/"use strict"

var shell = require("../util/shell"),
	_method = require("../es5/method")

var slice = Array.prototype.slice

var method = shell({

	inherits: _method,

	/*(method.attempt)?*/
	attempt: function(context){
		var args = slice.call(arguments)
		try {
			return this.apply(args.shift(), args)
		} catch (e){}
		return null
	}/*:*/

})

module.exports = method
