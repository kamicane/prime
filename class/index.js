/*
Prime!
*/"use strict"

var create = require("../util/create"),
	has = Object.hasOwnProperty

var _implement = function(obj){
	for (var k in obj) if (k !== "constructor" && k !== "inherits"){ //cant implement special properties
		this.prototype[k] = obj[k]
	}
	//TODO: fix stupid enum 🐛 here
	return this
}

module.exports = function(proto){

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

	// implement passed methods to subclass, using either superclass.implement or our own implement
	var implement = (superclass && superclass.implement) || _implement
	implement.call(constructor, proto)

	// and attach implement
	constructor.implement = implement

	return constructor

}
