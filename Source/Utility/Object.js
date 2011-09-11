/*
---
name: Object
description: custom Object prototypes and generics
...
*/

define(['../Core/Host', '../Host/Object'], function(Host, Object){
	
Object = Host(Object);

Object.extend({

	isEnumerable: function(self){
		return (self != null && typeof self == 'object' && typeof self.length == 'number');
	}

});

Object.implement({
	
	forEach: function(fn, context){
		for (var key in this){
			if (this.hasOwnProperty(key)) fn.call(context, this[key], key, this);
		}
	},

	getLength: function(){
		var length = 0;
		for (var key in this) length++;
		return length;
	},

	append: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {};
			for (var key in extended) this[key] = extended[key];
		}
		return this;
	},

	subset: function(keys){
		var results = {};
		for (var i = 0, l = keys.length; i < l; i++){
			var k = keys[i], value = this[k];
			results[k] = (value != null) ? value : null;
		}
		return results;
	},

	map: function(fn, bind){
		var results = {};
		for (var key in this) results[key] = fn.call(bind, this[key], key, this);
		return results;
	},

	filter: function(fn, bind){
		var results = {};
		for (var key in this){
			if (fn.call(bind, this[key], key, this)) results[key] = this[key];
		}
		return results;
	},

	every: function(fn, bind){
		for (var key in this){
			if (!fn.call(bind, this[key], key)) return false;
		}
		return true;
	},

	some: function(fn, bind){
		for (var key in this){
			if (fn.call(bind, this[key], key)) return true;
		}
		return false;
	},

	values: function(){
		var values = [];
		for (var key in this){
			if (this.hasOwnProperty(key)) values.push(this[key]);
		}
		return values;
	},

	keyOf: function(value){
		for (var key in this){
			if (this.hasOwnProperty(key) && this[key] === value) return key;
		}
		return null;
	},

	contains: function(value){
		return Object.keyOf(this, value) != null;
	}

});

return Object;

});
