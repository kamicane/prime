/*
Number pod with custom methods
*/

var number = require("../")(require("../number"))

number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
})

number.implement({

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0)
		return Math.round(this * precision) / precision
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, null, this)
	}

})

module.exports = number
