/*
---
name: forEach
description: for each
...
*/

define(['./typeOf', '../Host/Array', './Object'], function(typeOf, Array, Object){

return function(self, fn, context){
	switch(typeOf(self)){
		case 'object': Object.forEach(self, fn, context); break;
		case 'array': Array.forEach(self, fn, context); break;
		case 'number': for (var i = 0; i < self; i++) fn.call(context, i); break;
	}
};

});
