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
		var index = array.indexOf(responders, responder)
		if (index === -1) responders.push(responder)
		else return _

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
			this.gt = function(n){
				return self > n
			}
			this.lt = function(n){
				return self < n
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

		return _
	}

	_.unregister = function(responder){
		var index = array.indexOf(responders, responder)
		if (index > -1){
			responders.splice(index, 1)
			var m = map.splice(index, 1)
			m.base.implement = m.implement //reset implement to original value
		}
		return _
	}

	return _

}
