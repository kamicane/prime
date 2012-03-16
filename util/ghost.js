/*
ghost 👻
*/"use strict"

var prime = require("../prime"),
	Map = require("../map")

module.exports = function(){

	var map = new Map

	var ghost = function(self){
		var keys = map.keys(),
			values = map.values()

		var Ghost

		for (var i = keys.length, responder; responder = keys[--i];) if (responder(self)){
			Ghost = values[i].ghost
			break
		}

		return Ghost ? new Ghost(self) : self
	}

	ghost.register = function(responder, base){

		if (map.get(responder)) return ghost

		var Ghost = prime({ // yes, a prime in a prime

			mutator: function(key, method){
				return function(){
					return ghost(method.apply(this.valueOf(), arguments))
				}
			},

			constructor: function(self){
				this.valueOf = function(){
					return self
				}
				this.toString = function(){
					return self + ""
				}
				this.eq = function(object){
					return self === object
				}
			}

		})

		var mutator = base.mutator

		// override base mutator, so it automagically implements stuff in the ghost
		// when base changes
		base.mutator = function(key, method){
			mutator.call(this, key, method)
			Ghost.mutator(key, method)
		}

		Ghost.implement(base.prototype)

		map.set(responder, {base: base, ghost: Ghost, mutator: mutator})

		return ghost
	}

	ghost.unregister = function(responder){
		var value = map.remove(responder)
		if (value) value.base.mutator = value.mutator
		return ghost
	}

	return ghost

}
