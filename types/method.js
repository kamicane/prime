/*
Function shell with custom methods
*/

var method = require("../util/shell")(require("../es5/method"))

/*(method.attempt)?*/

var slice = Array.prototype.slice

method.extend("attempt", function(){
	for (var i = 0, l = arguments.length; i < l; i++) try {
		return arguments[i]()
	} catch (e){}
	return null
})

method.implement("attempt", function(context){
	var args = slice.call(arguments)
	try {
		return this.apply(args.shift(), args)
	} catch (e){}
	return null
})

/*:*/

module.exports = method
