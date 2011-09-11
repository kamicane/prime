/*
---
name: merge
description: merge things
...
*/

define(['./typeOf', '../Host/Object'], function(typeOf, Object){
	
var merge = function(self, key, value){
	if (typeof key == 'string'){
		if (typeOf(self[key]) == 'object' && typeOf(value) == 'object') merge(self[key], value);
		else self[key] = value;
	} else for (var i = 1, l = arguments.length; i < l; i++){
		var object = arguments[i];
		for (var k in object) merge(self, k, object[k]);
	}
	return self;
};

Object.extend('merge', merge).implement('merge', function(key, value){
	return merge(this, key, value);
});

return merge;
	
});
