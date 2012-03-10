/*
Function pod
*/

var slice = Array.prototype.slice, fn = require("./")(Function)

fn.bind = function(self){
	return fn.prototype.bind.apply(self, slice.call(arguments, 1))
}

module.exports = fn.implement("bind", function(bind){
	var self = this, args = (arguments.length > 1) ? slice.call(arguments, 1) : null;

	return function(){
		if (!args && !arguments.length) return self.call(bind)
		if (args && arguments.length) return self.apply(bind, args.concat(slice.call(arguments)))
		return self.apply(bind, args || arguments)
	}
})
