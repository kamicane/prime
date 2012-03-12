/*
Function shell
*/

var method = require("../util/shell")(Function)

//=es5,method.bind

var slice = Array.prototype.slice

method.bind = function(self){
	return method.prototype.bind.apply(self, slice.call(arguments, 1))
}

method.implement("bind", function(bind){
	var self = this, args = (arguments.length > 1) ? slice.call(arguments, 1) : null;

	return function(){
		if (!args && !arguments.length) return self.call(bind)
		if (args && arguments.length) return self.apply(bind, args.concat(slice.call(arguments)))
		return self.apply(bind, args || arguments)
	}
})

//.

module.exports = method
