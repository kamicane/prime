/*
Class
*/

var object = require("../es5/object"),
	type = require("../util/type")

var Class = function(superclass, proto){
	if (!proto) proto = superclass, superclass = null
	if (type(proto) === "method") proto = {constructor: proto}
	else if (!object.hasOwnProperty(proto, "constructor")) proto.constructor = function(){}
	var subclass = proto.constructor

	if (!superclass) superclass = proto.inherits || Class
	delete proto.inherits

	var superproto = superclass.prototype
	subclass.prototype = object.create(superproto)

	subclass.definitions = object.create(superclass.definitions)

	for (var method in superclass) if (!subclass[method]) subclass[method] = superclass[method]

	subclass.implement(proto)
	subclass.parent = superproto

	return subclass
}

var implement = function(self, any, value){
	var implementor = implement[type(any)]
	if (implementor) implementor.call(self, any, value)
}

implement.string = function(self, key, value){
	var definition = this.definitions[key]
	if (definition) definition.apply(self, [].concat(value))
	else self.prototype[key] = value
}

implement.array = function(self, array){
	for (var i = 0, l = array.length; i < l; i++) implement(self, array[i])
}

implement.object = function(self, obj){
	for (var k in obj) implement.string(self, k, key[k])
}

implement.method = function(self, fn){
	implement.object(self, object.create(fn.prototype))
}

Class.implement = function(obj, value){
	implement(this, obj, value)
	return this
}

Class.definitions = {"implement": function(){
	for (var i = 0, l = arguments.length; i < l; i++) implement(this, arguments[i])
}}

Class.define = function(key, value){
	this.definitions[key] = value
	return this
}

module.exports = Class
