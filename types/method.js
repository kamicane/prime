/*
Function shell with custom methods
*/

var array = require("../util/ghost").array,
	method = require("../es5/method")

/*(method.attempt)?*/

method.implement("attempt", function(context){
	var args = array.slice(arguments)
	try {
		return this.apply(args.shift(), args)
	} catch (e){}
	return null
})

/*:*/

module.exports = method
