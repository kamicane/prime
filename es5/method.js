/*
Function shell
*/

var ghost = require("../util/ghost"),
	method = ghost.method,
	array = ghost.array

/*(es5 && method.bind)?*/
if (!method.prototype.bind) method.implement("bind", function(bind){
	var self = this, args = (arguments.length > 1) ? array.slice(arguments, 1) : null;

	return function(){
		if (!args && !arguments.length) return self.call(bind)
		if (args && arguments.length) return self.apply(bind, args.concat(array.slice(arguments)))
		return self.apply(bind, args || arguments)
	}
})
/*:*/

module.exports = method
