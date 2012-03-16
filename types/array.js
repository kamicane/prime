/*
Array methods
*/"use strict"

var shell = require("../util/shell"),
	_array = require("../es5/array")

var array = shell({

	inherits: _array,

	/*(array.each)?*/
	each: function(fn, context){
		array.forEach(this, fn, context)
		return this
	},/*:*/

	/*(array.invoke)?*/
	invoke: function(name){
		var args = array.slice(arguments, 1), results = []
		for (var i = 0, j = this.length; i < j; i++){
			var item = this[i]
			results.push(item[name].apply(item, args))
		}
		return results
	},/*:*/

	/*(array.append)?*/
	append: function(list){
		array.prototype.push.apply(this, list)
		return this
	},/*:*/

	/*(array.contains)?*/
	contains: function(item, from){
		return array.indexOf(this, item, from) !== -1
	},/*:*/

	/*(array.last)?*/
	last: function(){
		var length = this.length
		return (length) ? this[length - 1] : null
	},/*:*/

	/*(array.random)?*/
	random: function(){
		var length = this.length
		return (length) ? this[Math.floor(Math.random() * length)] : null
	},/*:*/

	/*(array.include)?*/
	include: function(item){
		if (!array.contains(this, item)) this.push(item)
		return this
	},/*:*/

	/*(array.erase)?*/
	erase: function(item, one){
		for (var i = this.length; i--;) if (this[i] === item){
			array.splice(this, i, 1)
			if (one) break
		}
		return this
	},/*:*/

	/*(array.item)?*/
	item: function(at){
		var length = this.length
		if (at < 0) at = (at % length) + length
		return (at < 0 || at >= length || this[at] == null) ? null : this[at]
	}/*:*/

})

module.exports = array
