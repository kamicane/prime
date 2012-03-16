/*
Prime
*/"use strict"

var create = require("../util/create"),
	has = Object.hasOwnProperty

var _mutator = function(key, value){
	return value
}

var _implement = function(obj){
	//cant implement special properties
	for (var k in obj) if (k !== "constructor" && k !== "inherits" && k !== "mutator"){
		var value = this.mutator(k, obj[k])
		if (value != null) this.prototype[k] = value
	}
	//TODO: fix stupid enum 🐛 here
	return this
}

var prime = function(proto){

	var superprime = proto.inherits, superproto
	if (superprime) superproto = superprime.prototype

	// if our nice proto object has no own constructor property
	// then we proceed using a ghosting constructor that all it does is
	// call the parent's constructor if it has a superprime, else an empty constructor
	// proto.constructor becomes the effective constructor
	var constructor = (has.call(proto, "constructor")) ? proto.constructor : (superprime) ? function(){
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
	constructor.mutator = proto.mutator || (superprime && superprime.mutator) || _mutator
	// copy implement (this should never change)
	constructor.implement = _implement

	// finally implement proto and return constructor
	return constructor.implement(proto)

}

module.exports = prime
