/*
Array shell
*/

var array = require("../util/shell")(Array)


array.extend('isArray', /*(es5 && array.isArray)?*/function(object){
	return toString.call(object) == '[object Array]'
}/*:null*/)

array.implement({
	
	filter: /*(es5 && array.filter)?*/function(fn, context){
		var results = []
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) results.push(this[i])
		}
		return results;
	}/*:null*/,
	
	indexOf: /*(es5 && array.indexOf)?*/function(item, from){
		for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
			if (this[i] === item) return i
		}
		return -1
	}/*:null*/,
	
	
	map: /*(es5 && array.map)?*/function(fn, context){
		var length = this.length >>> 0, results = Array(length)
		for (var i = 0, l = length; i < l; i++){
			if (i in this) results[i] = fn.call(context, this[i], i, this)
		}
		return results
	}/*:null*/,
	
	forEach: /*(es5 && array.forEach)?*/function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if (i in this) fn.call(context, this[i], i, this)
		}
	}/*:null*/,
	
	
	every: /*(es5 && array.every)?*/function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(context, this[i], i, this)) return false
		}
		return true
	}/*:null*/,
	
	some: /*(es5 && array.some)?*/function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) return true
		}
		return false
	}/*:null*/

})

module.exports = array
