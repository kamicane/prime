/*
The Host object
*/

define(function(){

"use strict";

var slice = Array.prototype.slice, create = Object.create || function(self){
	var F = function(){};
	F.prototype = self;
	return new F;
};

var Host = function(guest){
	this.guest = guest;
	this.prototype = {};
};

var implement = Host.prototype.implement = function(key, fn){
	if (typeof key != 'string') for (var k in key) implement.call(this, k, key[k]); else if (!this.prototype[key] && fn){
		var proto = this.prototype[key] = (this.guest.prototype[key] || fn);
		extend.call(this, key, function(){
			var args = slice.call(arguments);
			return proto.apply(args.shift(), args);
		});
	}
	return this;
};

var extend = Host.prototype.extend = function(key, fn){
	if (typeof key != 'string') for (var k in key) extend.call(this, k, key[k]);
	else if (!this[key] && fn) this[key] = (this.guest[key] || fn);
	return this;
};

Host.prototype.install = function(){
	for (var key in this.prototype) if (!this.guest.prototype[key]) this.guest.prototype[key] = this.prototype[key];
	return this;
};

// Host class

return function(object){

	if (object instanceof Host){
		var host = create(object);
		host.prototype = create(object.prototype);
		return host;
	}

	return new Host(object);

};

});
