/*
Array shell
*/

var ghost = require("../util/ghost"),
	object = ghost.object,
	array = ghost.array

/*(es5 && array.isArray)?*/
if (!array.isArray) array.extend("isArray", function(obj){
	return object.toString(obj) == '[object Array]'
})/*:*/

/*(es5 && array.filter)?*/
if (!array.filter) array.implement("filter", function(fn, context){
	var results = []
	for (var i = 0, l = this.length >>> 0; i < l; i++){
		if ((i in this) && fn.call(context, this[i], i, this)) results.push(this[i])
	}
	return results
})/*:*/

/*(es5 && array.indexOf)?*/
if (!array.indexOf) array.implement("indexOf", function(item, from){
	for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
		if (this[i] === item) return i
	}
	return -1
})/*:*/

/*(es5 && array.map)?*/
if (!array.map) array.implement("map", function(fn, context){
	var length = this.length >>> 0, results = Array(length)
	for (var i = 0, l = length; i < l; i++){
		if (i in this) results[i] = fn.call(context, this[i], i, this)
	}
	return results
})/*:*/

/*(es5 && array.forEach)?*/
if (!array.forEach) array.implement("forEach", function(fn, context){
	for (var i = 0, l = this.length >>> 0; i < l; i++){
		if (i in this) fn.call(context, this[i], i, this)
	}
})/*:*/

/*(es5 && array.every)?*/
if (!array.every) array.implement("every", function(fn, context){
	for (var i = 0, l = this.length >>> 0; i < l; i++){
		if ((i in this) && !fn.call(context, this[i], i, this)) return false
	}
	return true
})/*:*/

/*(es5 && array.some)?*/
if (!array.some) array.implement("some", function(fn, context){
	for (var i = 0, l = this.length >>> 0; i < l; i++){
		if ((i in this) && fn.call(context, this[i], i, this)) return true
	}
	return false
})/*:*/

module.exports = array
