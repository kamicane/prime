/*
Emitter
*/"use strict"

var prime = require("../prime/"),
    slice = Array.prototype.slice

var EID = 0

module.exports = prime({

    on: function(event, fn){
        var listeners = this._listeners || (this._listeners = {}),
            events = listeners[event] || (listeners[event] = {})

        for (var k in events) if (events[k] === fn) return this

        events[(EID++).toString(36)] = fn
        return this
    },

    off: function(event, fn){
        var listeners = this._listeners, events, key, length = 0
        if (listeners && (events = listeners[event])){

            for (var k in events){
                length++
                if (key == null && events[k] === fn) key = k
                if (key && length > 1) break
            }

            if (key){
                delete events[key]
                if (length === 1){
                    delete listeners[event]
                    for (var l in listeners) return this
                    delete this._listeners
                }
            }
        }
        return this
    },

    emit: function(event){
        var listeners = this._listeners, events
        if (listeners && (events = listeners[event])){
            var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
            for (var k in events) events[k].apply(this, args)
        }
        return this
    }

})
