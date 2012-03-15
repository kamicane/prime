/*
Object shell with custom methods
*/

var object = require("../util/shell")(require("../es5/object")).implement({

	/*(object.forEach)?*/
	forEach: function(fn, context){
		for (var key in this) if (object.hasOwnProperty(this, key)) fn.call(context, this[key], key, this)
	},/*:*/

	/*(object.each)?*/
	each: function(fn, context){
		object.forEach(this, fn, context)
		return this
	},/*:*/

	/*(object.map)?*/
	map: function(fn, bind){
		var results = {}
		for (var key in this) results[key] = fn.call(bind, this[key], key, this)
		return results
	},/*:*/

	/*(object.filter)?*/
	filter: function(fn, bind){
		var results = {}
		for (var key in this) if (fn.call(bind, this[key], key, this)) results[key] = this[key]
		return results
	},/*:*/

	/*(object.every)?*/
	every: function(fn, bind){
		for (var key in this) if (!fn.call(bind, this[key], key)) return false
		return true
	},/*:*/

	/*(object.some)?*/
	some: function(fn, bind){
		for (var key in this) if (fn.call(bind, this[key], key)) return true
		return false
	},/*:*/

	/*(object.has)?*/
	has: function(key){
		return object.hasOwnProperty(this, key)
	},/*:*/

	/*(object.length)?*/
	length: function(){
		var length = 0
		for (var key in this) length++
		return length
	},/*:*/

	/*(object.append)?*/
	append: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {}
			for (var key in extended) this[key] = extended[key]
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
		for (var key in this) results[this[key]] = key
		return results
	},/*:*/

	/*(object.values)?*/
	values: function(){
		var values = []
		for (var key in this) if (object.hasOwnProperty(this, key)) values.push(this[key])
		return values
	},/*:*/

	/*(object.key)?*/
	key: function(value){
		for (var key in this) if (object.hasOwnProperty(this, key) && this[key] === value) return key
		return null
	},/*:*/

	/*(object.contains)?*/
	contains: function(value){
		return object.key(this, value) != null
	},/*:*/

	/*(object.type)?*/
	type: function(){
		return "object"
	}/*:*/

})

/*(object.encode)?*/
var json = require("../es5/json")
object.implement("encode", function(){
	return json.stringify(this)
})/*:*/

module.exports = object
