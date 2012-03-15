/*
Map
*/"use strict"

var Class = require("../class"),
	array = require("../es5/array")

module.exports = Class({

	constructor: function(){
		this.length = 0
		this.keys = []
		this.values = []
	},

	set: function(key, value){
		var index = array.indexOf(this.keys, key)

		if (index === -1){
			this.keys[++this.length] = key
			this.values[this.length] = value
		} else {
			this.values[index] = value
		}

		return this
	},

	get: function(key){
		var index = array.indexOf(this.keys, key)
		return (index === -1) ? null : this.values[index]
	},

	unset: function(key){
		var index = array.indexOf(this.keys, key)

		if (index !== -1){
			--this.length
			this.keys.splice(index, 1)
			return this.values.splice(index, 1)[0]
		}

		return null
	},

	each: function(fn, context){
		for (var i = 0, l = this.length; i < l; i++) fn.call(context, this.values[i], this.keys[i], this);
		return this
	}

})
