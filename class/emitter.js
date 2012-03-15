// emi: a stupidly tiny event emitter

var Class = require("./"),
	array = require("../es5/array")

module.exports = Class({

	on: function(event, fn){
		var listeners = this._listeners || (this._listeners = {}),
			events = listeners[event] || (listeners[event] = [])
		if (!events.length || array.indexOf(events, fn) === -1) events.push(fn)
		return this
	},

	off: function(event, fn){
		var listeners = this._listeners, events
		if (listeners && (events = listeners[event]) && events.length){
			var io = array.indexOf(events, fn)
			if (io > -1) events.splice(io, 1)
		}
		return this
	},

	emit: function(event){
		var listeners = this._listeners, events
		if (listeners && (events = listeners[event]) && events.length){
			var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
			array.forEach(events, function(event){
				event.apply(this, args)
			}, this)
		}
		return this
	}

})

