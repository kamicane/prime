/*
Number methods
*/"use strict"

var shell = require("../util/shell"),
	_number = require("../es5/number")

var number = shell({

	inherits: _number,

	/*(number.limit)?*/
	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},/*:*/

	/*(number.round)?*/
	round: function(precision){
		return parseFloat(this.toPrecision(precision))
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
