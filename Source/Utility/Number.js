/*
---
name: Number
description: custom Number prototypes and generics.
...
*/

define(['../Core/Host', '../Host/Number'], function(Host, Number){
	
Number = Host(Number);

Number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
});

Number.implement({

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0);
		return Math.round(this * precision) / precision;
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, null, this);
	}

});

var names = 'abs,acos,asin,atan,atan2,ceil,cos,exp,floor,log,max,min,pow,sin,sqrt,tan'.split(','),
	i = names.length, slice = Array.prototype.slice;

while (i--) (function(name){
	Number.extend(name, Math[name]).implement(name, function(){
		return Math[name].apply(null, [this].concat(slice.call(arguments)));
	});
})(names[i]);

return Number;

});
