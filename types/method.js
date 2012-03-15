/*
Function shell with custom methods
*/

var slice = Array.prototype.slice

var method = require("../util/shell")(require("../es5/method")).implement({

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
