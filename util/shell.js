/*
shell 🐚
*/"use strict"

var prime = require("../prime"),
	create = require("../util/create"),
	slice = Array.prototype.slice,
	has = Object.hasOwnProperty

var shell = prime({

	mutator: function(key, method){
		this.prototype[key] = method
		this[key] = function(self){
			var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
			return method.apply(self, args)
		}
	},

	constructor: {prototype: {}} // tricks of the trade

})

module.exports = function(proto){
	var inherits = proto.inherits || (proto.inherits = shell)
	proto.constructor = create(inherits)
	return prime(proto)
}
