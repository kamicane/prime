/*
Contains the Class Function for easily creating, extending, and implementing reusable Classes.
*/

define(['./Utility/typeOf', './Host/Object', './Accessor'], function(typeOf, Object, Accessor){

"use strict";

var Class = function(params){

	if (!params) params = {};

	var newClass = function(){
		return (this.initialize) ? this.initialize.apply(this, arguments) : this;
	};

	//Extends "embedded" mutator
	var parent = (params.Extends) ? params.Extends : Class;
	delete params.Extends;
	if (!parent.prototype instanceof Class) return new Error('"Extends" cannot be called with a function not inheriting from "Class"');
	var instance = Object.create(parent.prototype);
	newClass.parent = parent;
	newClass.prototype = instance;
	newClass.prototype.constructor = newClass;

	newClass.implement = implement;
	newClass.addAccessor = Class.addAccessor;

	var accessors = parent.accessors;
	for (var i = 0; i < accessors.length; i++) newClass.addAccessor(accessors[i]);

	newClass.implement(params);

	return newClass;
};

Class.prototype.parent = function(){
	if (!this.caller_) throw new Error('The method "parent" cannot be called.');
	var name = this.caller_.name_, parent = this.caller_.owner_.parent;
	var previous = (parent) ? parent.prototype[name] : null;
	if (!previous) throw new Error('The method "' + name + '" has no parent.');
	return previous.apply(this, arguments);
};

Class.addAccessor = function(accessor){
	if (!this.accessors) this.accessors = [];
	accessor = (typeof accessor != 'string') ? accessor() : Accessor.apply(null, arguments);
	this.accessors.push(accessor);
	for (var p in accessor) this[p] = accessor[p];
	return this;
};

var wrap = function(self, key, method){
	if (method.origin_) method = method.origin_;

	var wrapped = function(){
		if (method.protected_ && this.caller_ == null) throw new Error('The method "' + key + '" cannot be called.');
		var old = this.caller_; this.caller_ = wrapped;
		var result = method.apply(this, arguments);
		if (old != null) this.caller_ = old; else delete this.caller_;
		return result;
	};

	wrapped.owner_ = self;
	wrapped.name_ = key;
	wrapped.origin_ = method;

	return wrapped;
};

var implement_ = function(self, key, value, nowrap){
	var mutator = self.lookupMutator(key);
	if (mutator){
		value = mutator.call(self, value);
		if (value == null) return;
	}
	self.prototype[key] = (nowrap || typeOf(value) != 'function') ? value : wrap(self, key, value);
};

var implement = function(item){
	switch (typeOf(item)){
		case 'string': implement_(this, item, arguments[1]); break;
		case 'function':
			var instance = Object.create(item.prototype);
			for (var k in instance) implement_(this, k, instance[k], true);
		break;
		case 'object': for (var o in item) implement_(this, o, item[o]); break;
	}
	return this;
};

Class.addAccessor('Mutator');

Class.defineMutator('Implements', function(items){
	if (typeOf(items) != 'array') items = [items];
	for (var i = 0; i < items.length; i++) implement.call(this, items[i]);
}).defineMutator(/^protected\s(\w+)$/, function(fn, name){
	fn.protected_ = true;
	this.prototype[name] = wrap(this, name, fn);
});

return Class;

});
