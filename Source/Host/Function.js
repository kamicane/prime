/*
---
name: Function
description: ES5 Function methods
...
*/

define(['../Host'], function(Host){

var slice = Array.prototype.slice, Function_ = Host(Function);

Function_.bind = function(self){
	return Function_.prototype.bind.apply(self, slice.call(arguments, 1));
};

return Function_.implement({

	bind: function(bind){
		var self = this, args = (arguments.length > 1) ? slice.call(arguments, 1) : null;

		return function(){
			if (!args && !arguments.length) return self.call(bind);
			if (args && arguments.length) return self.apply(bind, args.concat(slice.call(arguments)));
			return self.apply(bind, args || arguments);
		};
	}

});

});
