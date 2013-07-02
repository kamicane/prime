/*
Emitter
*/"use strict"

var prime = require("./index"),
    defer = require("./defer"),
    slice = require("./array/slice")

var EID = 0

var Emitter = prime({

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
        var args = slice(arguments, 1)

        var emit = function(){
            var listeners = this._listeners, events
            if (listeners && (events = listeners[event])){
                var copy = {}, k
                for (k in events) copy[k] = events[k]
                for (k in copy) copy[k].apply(this, args)
            }

        }

        if (args[args.length - 1] === Emitter.EMIT_SYNC){
            args.pop()
            emit()
        } else {
            defer(emit)
        }

        return this
    }

})

Emitter.EMIT_SYNC = {}

module.exports = Emitter
