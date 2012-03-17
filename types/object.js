/*
Object methods
*/"use strict"

var shell = require("../util/shell"),
	_object = require("../es5/object"),
	prime = require("../prime")

var object = shell({

	inherits: _object,

	/*(object.each)?*/
	each: function(method, context){
		return prime.forIn(this, function(key, value, self){
			method.call(context, value, key, self)
		})
	},/*:*/

	/*(object.map)?*/
	map: function(method, context){
		var results = {}
		prime.forIn(this, function(key, value, self){
			results[key] = method.call(context, value, key, self)
		})
		return results
	},/*:*/

	/*(object.filter)?*/
	filter: function(method, context){
		var results = {}
		prime.forIn(this, function(key, value, self){
			if (method.call(context, value, key, self)) results[key] = value
		})
		return results
	},/*:*/

	/*(object.every)?*/
	every: function(fn, bind){
		var every = true
		prime.forIn(this, function(key, value, self){
			if (every && !fn.call(context, value, key, self)) every = false
		})
		return every
	},/*:*/

	/*(object.some)?*/
	some: function(fn, bind){
		var some = false
		prime.forIn(this, function(key, value, self){
			if (!some && fn.call(context, value, key, self)) some = true
		})
		return some
	},/*:*/

	/*(object.has)?*/
	has: function(key){
		return prime.has(this, key)
	},/*:*/

	/*(object.length)?*/
	length: function(){
		var length = 0
		prime.forIn(this, function(){
			length++
		})
		return length
	},/*:*/

	/*(object.append)?*/
	append: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {}
			prime.forIn(extended, function(value, key, self){
				self[key] = value
			})
		}
		return this
	},/*:*/

	/*(object.subset)?*/
	subset: function(keys){
		var results = {}
		for (var i = 0, l = keys.length; i < l; i++){
			var k = keys[i], value = this[k]
			results[k] = (value != null) ? value : null
		}
		return results
	},/*:*/

	/*(object.reverse)?*/
	reverse: function(){
		var results = {}
		prime.forIn(this, function(key, value){
			results[value] = key
		})
		return results
	},/*:*/

	/*(object.values)?*/
	values: function(){
		var values = []
		prime.forIn(this, function(key, value){
			values.push(value)
		})
		return values
	},/*:*/

	/*(object.keys)?*/
	keys: function(value){
		var keys = []
		prime.forIn(this, function(key){
			keys.push(key)
		})
		return keys

	}/*:*/

})

/*(object.encode)?*/
if (typeof JSON !== 'undefined') object.implement({encode: function(){
	return JSON.stringify(this)
}})/*:*/

module.exports = object
