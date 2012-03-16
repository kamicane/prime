/*
Prime
*/"use strict"

var has = function(key){
	return Object.hasOwnProperty.call(self, key)
}

var create = Object.create/*(es5)?*/ || function(self){
	var F = function(){}
	F.prototype = self
	return new F
}/*:*/

var forIn = function(object, method, context){
	for (var key in object) method.call(context, key, object[key], object)
	return object
}

/*(es5)?*/
if (!({valueOf: 0}).propertyIsEnumerable("valueOf")){ // fix stupid IE enum 🐛

	var enumBugProps = "constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString".split(","),
		proto = Object.prototype
		_forIn = forIn

	forIn = function(object, method, context){
		_forIn(object, method, context)
		var i = enumBugProps.length
		while (i--){
			var key, value = object[(key = enumBugProps[i])]
			if (value !== proto[key]) method.call(context, key, value, object)
		}
	}

}/*:*/

var mutator = function(key, value){
	this.prototype[key] = value
}

var implement = function(obj){
	forIn(obj, function(key, value){
		if (key !== "constructor" && key !== "inherits" && key !== "mutator"){
			this.mutator(key, value)
		}
	}, this)
	return this
}

var prime = function(proto){

	var superprime = proto.inherits, superproto
	if (superprime) superproto = superprime.prototype

	// if our nice proto object has no own constructor property
	// then we proceed using a ghosting constructor that all it does is
	// call the parent's constructor if it has a superprime, else an empty constructor
	// proto.constructor becomes the effective constructor
	var constructor = (has(proto, "constructor")) ? proto.constructor : (superprime) ? function(){
		return superproto.constructor.apply(this, arguments)
	} : function(){}

	if (superprime){

		// inherit from superprime
		var cproto = constructor.prototype = create(superproto)

		// setting constructor.parent to superprime.prototype
		// because it's the shortest possible absolute reference
		constructor.parent = superproto
		cproto.constructor = constructor
	}

	// inherit (kindof inherit) mutator
	constructor.mutator = proto.mutator || (superprime && superprime.mutator) || mutator
	// copy implement (this should never change)
	constructor.implement = implement

	// finally implement proto and return constructor
	return constructor.implement(proto)

}

prime.forIn = forIn
prime.has = has
prime.create = create

module.exports = prime
