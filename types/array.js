/*
Array shell with custom methods
*/

var array = require("../util/shell")(require("../es5/array"))

array.implement({
	
	//=array.each
	each: function(fn, context){
		array.prototype.forEach.call(this, fn, context)
		return this
	},//.
	
	//=array.invoke
	invoke: function(name){
		var args = array.slice(arguments, 1), results = []
		for (var i = 0, j = this.length; i < j; i++){
			var item = this[i]
			results.push(item[name].apply(item, args))
		}
		return results
	},//.
	
	//=array.append
	append: function(array){
		this.push.apply(this, array)
		return this
	},//.
	
	//=array.contains
	contains: function(item, from){
		return array.indexOf(this, item, from) != -1
	},//.
	
	//=array.last
	last: function(){
		var length = this.length
		return (length) ? this[length - 1] : null
	},//.
	
	//=array.random
	random: function(){
		var length = this.length
		return (length) ? this[Math.floor(Math.random() * length)] : null
	},//.
	
	//=array.include
	include: function(item){
		if (!array.contains(this, item)) this.push(item)
		return this
	},//.
	
	//=array.erase
	erase: function(item){
		for (var i = this.length; i--; i) if (this[i] === item) this.splice(i, 1)
		return this
	},//.
	
	//=array.item
	item: function(at){
		var length = this.length
		if (at < 0) at = (at % length) + length
		return (at < 0 || at >= length || this[at] == null) ? null : this[at]
	}//.

})

module.exports = array
