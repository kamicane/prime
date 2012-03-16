/*
shell 🐚
*/"use strict"

var prime = require("../prime"),
	slice = Array.prototype.slice,
	has = Object.hasOwnProperty

var shell = prime({

	mutator: function(key, method){
		this[key] = function(self){
			var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
			return method.apply(self, args)
		}

		return method
	},

	constructor: {prototype: {}}

})

module.exports = function(proto){
	var inherits = proto.inherits || (proto.inherits = shell)
	proto.constructor = prime.create(inherits)
	return prime(proto)
}
