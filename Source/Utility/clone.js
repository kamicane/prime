/*
---
name: clone
description: clone things
...
*/

define(['./typeOf', '../Host/Array', '../Host/Object'], function(typeOf, Array, Object){
	
var clone = function(item){
	switch (typeOf(item)){
		case 'array': return Array.clone(item);
		case 'object': return Object.clone(item);
		default: return item;
	}
};

Array.implement('clone', function(){
	var i = this.length, cloned = new Array(i);
	while (i--) cloned[i] = clone(this[i]);
	return cloned;
});

Object.implement('clone', function(){
	var cloned = {};
	for (var key in this) cloned[key] = clone(this[key]);
	return cloned;
});

return clone;
	
});
