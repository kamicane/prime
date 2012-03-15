/*
Function shell
*/"use strict"

var shell = require("../util/shell")

var proto = Function.prototype,
	slice = Array.prototype.slice

var method = shell().implement({

	apply: proto.apply,

	call: proto.call,

	bind: proto.bind/*(es5 && method.bind)?*/ || function(bind){
		var self = this, args = (arguments.length > 1) ? slice.call(arguments, 1) : null;

		return function(){
			if (!args && !arguments.length) return self.call(bind)
			if (args && arguments.length) return self.apply(bind, args.concat(slice.call(arguments)))
			return self.apply(bind, args || arguments)
		}
	}/*:*/

})

module.exports = method
