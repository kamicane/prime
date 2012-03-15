/*
ghost 👻
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
		var io = array.indexOf(responders, responder)
		if (io === -1) responders.push(responder)
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
			this.eq = function(object){
				return self === object
			}
		}

		var _implement = function(props){
			for (var key in props) (function(key, method){
				ghost.prototype[key] = function(){
					return _(method.apply(this.valueOf(), arguments))
				}
			})(key, props[key])
		}

		var __implement = base.implement

		base.implement = function(props){
			_implement(props)
			__implement.call(this, props)
		}

		_implement.call(ghost, base.prototype)

		m.implement = __implement
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
