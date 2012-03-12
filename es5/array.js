/*
Array shell
*/

var array = require("../util/shell")(Array)

//=array.isArray
array.extend('isArray', function(object){
	return toString.call(object) == '[object Array]'
})//.

array.implement({
	
	//=array.filter
	filter: function(fn, context){
		var results = []
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) results.push(this[i])
		}
		return results;
	},//$
	
	//=array.indexOf
	indexOf: function(item, from){
		for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
			if (this[i] === item) return i
		}
		return -1
	},//.
	
	//=array.map
	map: function(fn, context){
		var length = this.length >>> 0, results = Array(length)
		for (var i = 0, l = length; i < l; i++){
			if (i in this) results[i] = fn.call(context, this[i], i, this)
		}
		return results
	},//.
	
	//=array.forEach
	forEach: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if (i in this) fn.call(context, this[i], i, this)
		}
	},//.
	
	//=array.every
	every: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && !fn.call(context, this[i], i, this)) return false
		}
		return true
	},//.
	
	//=array.some
	some: function(fn, context){
		for (var i = 0, l = this.length >>> 0; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) return true
		}
		return false
	}//.

})

module.exports = array
