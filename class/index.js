/*
SuperClass!
*/"use strict"

var type = require("../util/type"),
	create = require("../util/create"),
	has = Object.hasOwnProperty

var Super = function(){},
	empty = function(){}

var implement = Super.implement = function(any, value){
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
		as.object.call(this, create(method.prototype))
	}

}

// special class properties that do not necessarily result in prototypes
// can be set with MySuper.define()

Super.definitions = {
	inherits: empty,
	constructor: empty,
	mixin: function(){
		implement.array.call(this, arguments)
	}
}

Super.define = function(key, value){
	this.definitions[key] = value
	return this
}

module.exports = function(proto){

	if (!proto) proto = {}
	else if (type(proto) === "function") proto = {constructor: proto}

	var superclass = proto.inherits, superproto
	if (superclass) superproto = superclass.prototype

	// if our nice proto object has no own constructor property
	// then we proceed using a ghosting constructor that all it does is
	// call the parent's constructor if it has a superclass, else an empty constructor
	// this way proto.constructor becomes the effective constructor (subclass)
	var subclass = (has.call(proto, "constructor")) ? proto.constructor : (superclass) ? function(){
		return superproto.constructor.apply(this, arguments)
	} : function(){}

	if (superclass){
		var subproto = subclass.prototype = create(superproto)

		// resetting subclass.prototype.constructor to subclass, since it's been overridden by the prototype set
		subproto.constructor = subclass

		// setting subclass.parent to superclass.prototype
		// because it's the shortest possible absolute reference
		subclass.parent = superproto
	} else superclass = Super //set superclass to Super to inherit definitions and methods

	// inherit definitions from the superclass definitions
	subclass.definitions = create(superclass.definitions)

	// implement passed methods to subclass
	as.object.call(subclass, proto)

	// simple property copy from subclass to superclass
	// this sets stuff like define and implement
	// and other static extensions anyone might have added to their parent classes
	for (var name in superclass) if (!subclass[name]) subclass[name] = superclass[name]

	return subclass

}
