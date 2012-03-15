/*
Object shell
*/

var shell = require("../util/shell")

var hasOwnProperty = Object.prototype.hasOwnProperty

var protoize = function(method){
	return function(){
		var args = (arguments.length) ? slice.call(arguments) : null
		return args ? method.apply(null, [this].concat(args)) : method.call(null, this)
	}
}

var object = shell()

object.create = require("../util/create")

object.keys = Object.keys/*(es5 && object.keys)?*/ || function(self){
	var keys = []
	for (var key in self) if (object.hasOwnProperty(this, key)) keys.push(key)
	return keys
}/*:*/

var names = "getPrototypeOf,getOwnPropertyDescriptor,getOwnPropertyNames,preventExtensions,isExtensible,seal,isSealed,freeze,isFrozen".split(",")
for (var i = 0, name, method; name = names[i++];) if ((method = Object[name])) object[name] = method

for (var name in object) if (name !== "prototype") object.prototype[name] = protoize(object[name])

object.hasOwnProperty = function(self, k){
	return hasOwnProperty.call(self, k)
}

object.prototype.hasOwnProperty = hasOwnProperty

module.exports = object
