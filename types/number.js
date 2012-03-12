/*
Number shell with custom methods
*/

var number = require("../util/shell")(Number)

//=numer.random
number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
})//.

number.implement({
	
	//=number.limit
	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},//.
	
	//=number.round
	round: function(precision){
		precision = Math.pow(10, precision || 0)
		return Math.round(this * precision) / precision
	},//.

	//=number.times
	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, null, this)
	},//.

	//=number.type
	type: function(){
		return "number"
	}//.

})

module.exports = number
