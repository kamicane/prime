/*
Prime
*/"use strict"

var has = Object.hasOwnProperty

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

var create = Object.create/*(es5)?*/ || function(self){
	var F = function(){}
	F.prototype = self
	return new F
}/*:*/

var prime = function(proto){

	var superclass = proto.inherits, superproto
	if (superclass) superproto = superclass.prototype

	// if our nice proto object has no own constructor property
	// then we proceed using a ghosting constructor that all it does is
	// call the parent's constructor if it has a superclass, else an empty constructor
	// proto.constructor becomes the effective constructor
	var constructor = (has.call(proto, "constructor")) ? proto.constructor : (superclass) ? function(){
		return superproto.constructor.apply(this, arguments)
	} : function(){}

	if (superclass){

		// inherit from superclass
		var cproto = constructor.prototype = create(superproto)

		// setting constructor.parent to superclass.prototype
		// because it's the shortest possible absolute reference
		constructor.parent = superproto
		cproto.constructor = constructor
	}

	// inherit (kindof inherit) mutator
	constructor.mutator = proto.mutator || (superclass && superclass.mutator) || _mutator
	// copy implement (this should never change)
	constructor.implement = _implement

	// finally implement proto and return constructor
	return constructor.implement(proto)

}

prime.create = create

module.exports = prime
