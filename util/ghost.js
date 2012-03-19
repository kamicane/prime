/*
ghost 👻
*/"use strict"

var prime = require("../prime"),
	map = require("../collection/map"),
	list = require("../es5/array")

module.exports = function(){

	var ghosts = map()

	var ghost = function(self){

		var responders = ghosts._keys,
			hashes = ghosts._values

		var Ghost

		for (var i = responders.length, responder; responder = responders[--i];) if (responder(self)){
			Ghost = hashes[i].ghost
			break
		}

		return Ghost ? new Ghost(self) : self
	}

	ghost.register = function(responder, base){

		if (ghosts.get(responder)) return ghost

		var Ghost = prime({ // yes, a prime in a prime

			mutator: function(key, method){
				this.prototype[key] = function(){
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
				this.is = function(object){
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

		ghosts.set(responder, {base: base, ghost: Ghost, mutator: mutator})

		return ghost
	}

	ghost.unregister = function(responder){
		var hash = ghosts.remove(responder)
		if (hash) hash.base.mutator = hash.mutator
		return ghost
	}

	return ghost

}
