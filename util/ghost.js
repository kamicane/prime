/*
ghost swooooshhhh
*/"use strict"

var array = require("../es5/array")

module.exports = function(){

	var responders = [], map = []

	var _ = function(self){
		var ghost
		for (var i = responders.length, responder; responder = responders[--i];) if (responder(self)){
			ghost = map[i].ghost
			break
		}

		return ghost ? new ghost(self) : self
	}

	_.register = function(responder, base){

		if (array.indexOf(responders, responder) == -1) responders.push(responder)
		else return map[io].ghost

		var m = {}
		map.push(m)

		var ghost = function(self){
			this.valueOf = function(){
				return self
			}
			this.toString = function(){
				return self + ""
			}
		}

		var gi = function(name, method){
			ghost.prototype[name] = function(){
				return _(method.apply(this.valueOf(), arguments))
			}
		}

		var _implement = base.implement

		var implement = base.implement = function(key, method){
			if (typeof key !== 'string') for (var k in key) implement.call(this, k, key[k])
			else {
				_implement.call(this, key, method)
				gi(key, method)
			}
		}

		for (var name in base.prototype) gi(name, base.prototype[name])

		m.implement = _implement
		m.base = base
		return m.ghost = ghost
	}

	_.unregister = function(responder){
		var io = array.indexOf(responders, responder), ghost
		if (io > -1){
			responders.splice(io, 1)
			var m = map.splice(io, 1)
			ghost = m.ghost
			m.base.implement = m.implement //reset implement to original value
		}
		return ghost
	}

	return _

}
