/*
Array pod
*/

var array = require("./")(Array),
	toString = Object.prototype.toString

array.extend('isArray', function(object){
	return toString.call(object) == '[object Array]'
})

module.exports = array.implement({

	filter: function(fn, context){
		var results = []
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) results.push(this[i])
		}
		return results;
	},

	indexOf: function(item, from){
		for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
			if (this[i] === item) return i
		}
		return -1
	},

	map: function(fn, context){
		var length = this.length >>> 0, results = Array(length)
		for (var i = 0, l = length; i < l; i++){
			if (i in this) results[i] = fn.call(context, this[i], i, this)
		}
		return results
	},

	every: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(context, this[i], i, this)) return false
		}
		return true
	},

	some: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) return true
		}
		return false
	},

	forEach: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if (i in this) fn.call(context, this[i], i, this)
		}
	}

})
