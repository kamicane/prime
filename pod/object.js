/*
Object pod
*/

module.exports = require("./")(Object).extend({

	create: function(self){
		var F = function(){}
		F.prototype = self
		return new F
	},

	keys: function(self){
		var keys = []
		for (var key in self) if (self.hasOwnProperty(key)) keys.push(key)
		return keys
	}

})
