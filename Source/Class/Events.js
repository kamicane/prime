/*
---
name: Events
description: Events
requires: [Type, Array, Function, Class, Table]
provides: Events
...
*/

define(['../Core/Class', '../Utility/Function', '../Data/Table'], function(Class, Function, Table){

"use strict";

var uid = '_events';

return new Class({

	listen: Function.overloadSetter(function(type, fn){
		if (!this[uid]) this[uid] = {};

		if (!this[uid][type]) this[uid][type] = new Table;
		var events = this[uid][type];
		if (events.get(fn)) return this;

		var bound = Function.bind(fn, this);

		events.set(fn, bound);

		return this;
	}),

	ignore: Function.overloadSetter(function(type, fn){
		if (!this[uid]) return this;

		var events = this[uid][type];
		if (!events) return this;

		if (type == null){ //ignore all
			for (var ty in this[uid]) this.ignore(ty);
		} else if (fn == null){ // ignore every of type
			events.forEach(function(fn){
				this.ignore(type, fn);
			}, this);
		} else { // ignore one
			events.unset(fn);
		}

		return this;
	}),

	fire: function(type){
		if (!this[uid]) return this;
		var events = this[uid][type];
		if (!events) return this;

		var args = [].slice.call(arguments, 1);

		events.forEach(function(fn, bound){
			fn.apply(this, args);
		}, this);

		return this;
	}

});

});
