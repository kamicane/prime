/*
Shell
*/"use strict"

var create = require("../util/create"),
	slice = Array.prototype.slice

var shell = function(){}

var implement = shell.implement = function(props){
	for (var key in props) (function(key, method){
		this.prototype[key] = method
		this[key] = function(self){
			var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
			return method.apply(self, args)
		}
	}).call(this, key, props[key])
	return this
}

module.exports = function(base){
	var shl = create(base || (base = shell))
	shl.prototype = create(base.prototype)
	return shl
}
