/*
Class
*/

var object = require("../es5/object"),
	type = require("../util/type")

var Class = noop = function(){}

var implement = Class.implement = function(any, value){
	var impl = as[type(any)]
	if (impl) impl.call(this, any, value)
	return this
}

// this is what happens when someone implements stuff in a class, depending on type

var as = {
	// when implementing as string we check for the definition first
	// if found, we skip setting the prototype and call the defined function instead
	string: function(key, value){
		var definition = this.definitions[key]
		if (definition) definition.apply(this, [].concat(value))
		else this.prototype[key] = value
	},

	array: function(list){
		for (var i = 0, l = list.length; i < l; i++) implement.call(this, list[i])
	},

	object: function(obj){
		for (var k in obj) as.string.call(this, k, obj[k])
		// TODO: fix stupid enum bug here
	},

	method: function(method){
		as.object.call(this, object.create(method.prototype))
	}

}

// special class properties that do not necessarily result in prototypes
// can be set with MyClass.define()

Class.definitions = {
	inherits: noop,
	constructor: noop,
	implement: function(){
		implement.array.call(this, arguments)
	}
}

Class.define = function(key, value){
	this.definitions[key] = value
	return this
}

module.exports = function(proto){
	// if the current class doesnt inherit from anything
	// then we make it inherit from Class
	var superclass = proto.inherits || Class

	var superproto = superclass.prototype

	// if our nice proto object has no own constructor property
	// then we proceed using a ghosting constructor that all it does is
	// call the parent's constructor
	// this way proto.constructor becomes the effective constructor (subclass)
	var subclass = (object.hasOwnProperty(proto, "constructor")) ? proto.constructor : function(){
		return superproto.constructor.apply(this, arguments)
	}

	// inherit from the superclass
	var subproto = subclass.prototype = object.create(superproto)

	// inherit definitions from the superclass definitions
	subclass.definitions = object.create(superclass.definitions)

	// implement passed methods to subclass
	as.object.call(subclass, proto)

	// simple property copy from subclass to superclass
	// this sets stuff like define and implement
	// and other extensions anyone might have added to their parent classes
	for (var method in superclass) subclass[method] = superclass[method]

	// resetting subproto.constructor to subclass, since it's been overridden by the prototype set
	subproto.constructor = subclass

	// setting subclass.parent to superclass.prototype
	// because it's the shortest possible absolute reference
	subclass.parent = superproto

	return subclass
}
