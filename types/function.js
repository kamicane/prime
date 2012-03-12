/*
Function shell with custom methods
*/

var fn = require("../util/shell")(require("../function"))

//=function.attempt

var slice = Array.prototype.slice

fn.extend("attempt", function(){
	for (var i = 0, l = arguments.length; i < l; i++) try {
		return arguments[i]()
	} catch (e){}
	return null
})

fn.implement("attempt", function(context){
	var args = slice.call(arguments)
	try {
		return this.apply(args.shift(), args)
	} catch (e){}
	return null
})

//.

module.exports = fn
