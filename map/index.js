/*
Map
*/"use strict"

var Class = require("../class"),
	array = require("../es5/array")

module.exports = Class({

	constructor: function(){
		this.length = 0
		this._keys = []
		this._values = []
	},

	set: function(key, value){
		var index = array.indexOf(this._keys, key)

		if (index === -1){
			this._keys[++this.length] = key
			this._values[this.length] = value
		} else {
			this._values[index] = value
		}

		return this
	},

	has: function(key){
		return array.indexOf(this._keys, key) > -1
	},

	get: function(key){
		var index = array.indexOf(this._keys, key)
		return (index === -1) ? null : this._values[index]
	},

	remove: function(key){
		var index = array.indexOf(this._keys, key)

		if (index !== -1){
			--this.length
			this._keys.splice(index, 1)
			return this._values.splice(index, 1)[0]
		}

		return null
	},

	keys: function(){
		return this._keys.slice()
	},

	values: function(){
		return this._values.slice()
	},

	each: function(fn, context){
		for (var i = 0, l = this.length; i < l; i++) fn.call(context, this._values[i], this._keys[i], this);
		return this
	}

})
