/*
Access things
*/

define(['../Utility/typeOf', '../Host/Object', '../Host/Array'], function(typeOf, Object, Array){

var Accessor = function(singular, plural, accessor, matcher){

	singular = singular || ''; plural = plural || singular + 's'; accessor = accessor || {}; matcher = matcher || {};

	var define = 'define', lookup = 'lookup', match = 'match', each = 'each',
	
	self = function(){
		return Accessor(singular, plural, Object.create(accessor), Object.create(matcher));
	},

	defineSingular = self[define + singular] = function(key, value){
		if (typeOf(key) == 'regexp') matcher[String(key)] = {'regexp': key, 'value': value, 'type': typeOf(value)};
		else accessor[key] = value;
		return this;
	},
	
	definePlural = self[define + plural] = function(object){
		for (var key in object) accessor[key] = object[key];
		return this;
	},
	
	lookupSingular = self[lookup + singular] = function(key){
		if (accessor[key]) return accessor[key];
		for (var m in matcher){
			var current = matcher[m], matched = key.match(current.regexp);
			if (matched && (matched = matched.slice(1))){
				if (current.type == 'function') return function(){
					return current.value.apply(this, Array.slice(arguments).concat(matched));
				}; else return current.value;
			}
		}
		return null;
	},
 
	lookupPlural = self[lookup + plural] = function(){
		var results = {};
		for (var i = 0; i < arguments.length; i++){
			var argument = arguments[i];
			results[argument] = lookupSingular(argument);
		}
		return result;
	},
	
	eachSingular = self[each + singular] = function(fn, context){
		for (var key in accessor) fn.call(context, this[key], key, this);
	};
	
	return self;
};

return Accessor;

});
