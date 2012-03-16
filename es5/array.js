/*
Array shell
*/"use strict"

var proto = Array.prototype

var array = require("../util/shell")().implement({

	filter: proto.filter/*(es5 && array.filter)?*/ || function(fn, context){
		var results = []
		for (var i = 0, l = this.length >>> 0; i < l; i++) if (i in this){
			var value = this[i]
			if (fn.call(context, value, i, this)) results.push(value)
		}
		return results
	}/*:*/,

	indexOf: proto.indexOf/*(es5 && array.indexOf)?*/ || function(item, from){
		for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
			if (this[i] === item) return i
		}
		return -1
	}/*:*/,

	map: proto.map/*(es5 && array.map)?*/ || function(fn, context){
		var length = this.length >>> 0, results = Array(length)
		for (var i = 0, l = length; i < l; i++){
			if (i in this) results[i] = fn.call(context, this[i], i, this)
		}
		return results
	}/*:*/,

	forEach: proto.forEach/*(es5 && array.forEach)?*/ || function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if (i in this) fn.call(context, this[i], i, this)
		}
	}/*:*/,

	every: proto.every/*(es5 && array.every)?*/ || function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(context, this[i], i, this)) return false
		}
		return true
	}/*:*/,

	some: proto.some/*(es5 && array.some)?*/ || function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) return true
		}
		return false
	}/*:*/

})


array.isArray = Array.isArray/*(es5 && array.isArray)?*/ || function(self){
	return Object.prototype.toString.call(self) === "[object Array]"
}/*:*/

var methods = {}
array.forEach("pop,push,reverse,shift,sort,splice,unshift,concat,join,slice,lastIndexOf,reduce,reduceRight".split(","), function(name){
	var method = proto[name]
	if (method) methods[name] = method
})

module.exports = array.implement(methods)
