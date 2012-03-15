/*
Number methods
*/"use strict"

var number = require("../util/shell")(require("../es5/number")).implement({

	/*(number.limit)?*/
	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},/*:*/

	/*(number.round)?*/
	round: function(precision){
		precision = Math.pow(10, precision || 0)
		return Math.round(this * precision) / precision
	},/*:*/

	/*(number.times)?*/
	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, null, this)
	},/*:*/

	/*(numer.random)?*/
	random: function(max){
		return Math.floor(Math.random() * (max - this + 1) + this)
	}/*:*/


})

module.exports = number
