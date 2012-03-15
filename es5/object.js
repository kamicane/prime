/*
Object shell
*/"use strict"

var object = require("../util/shell")(),
	slice = Array.prototype.slice

var has = Object.hasOwnProperty

var protoize = function(method){
	return function(){
		var args = (arguments.length) ? slice.call(arguments) : null
		return args ? method.apply(object, [this].concat(args)) : method.call(object, this)
	}
}

object.create = require("../util/create")

object.keys = Object.keys/*(es5 && object.keys)?*/ || function(self){
	var keys = []
	for (var key in self) if (object.hasOwnProperty(this, key)) keys.push(key)
	return keys
}/*:*/

var names = "defineProperty,defineProperties,getPrototypeOf,getOwnPropertyDescriptor,getOwnPropertyNames," +
			"preventExtensions,isExtensible,seal,isSealed,freeze,isFrozen".split(",")

for (var i = 0, name, method; name = names[i++];) if ((method = Object[name])) object[name] = method

for (name in object) if (name !== "prototype") object.prototype[name] = protoize(object[name])

object.hasOwnProperty = function(self, k){
	return has.call(self, k)
}

object.prototype.hasOwnProperty = has

module.exports = object
