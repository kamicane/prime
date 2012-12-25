/*
ghost
*/"use strict"

var prime  = require("../prime/"),
    type   = require("../util/type"),
    string = require("../types/string"),
    number = require("../types/number"),
    map    = require("../collection/map"),
    list   = require("../collection/list"),
    hash   = require("../collection/hash")

var ghosts = map()

var ghost = function(self){

    if (self == null) return self

    var Ghost

    ghosts.backwards(function(hash){
        if (hash.responder(self)) return !(Ghost = hash.ghost)
    })

    return Ghost ? new Ghost(self) : self

}

ghost.register = function(base, responder){

    ghosts.remove(base)

    var Ghost = prime({

        define: function(key, descriptor){
            var method = descriptor.value

            if (typeof method === "function") descriptor.value = function(){
                return ghost(method.apply(this.valueOf(), arguments))
            }

            prime.define(this.prototype, key, descriptor)
            return this
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

    Ghost.implement(base.prototype)

    var define = Ghost.define
    Ghost.define = function(key, descriptor){
        base.define(key, descriptor)
        return define.call(Ghost, key, descriptor)
    }

    ghosts.set(base, {ghost: Ghost, responder: responder})

    return Ghost

}

ghost.unregister = function(base){
    var hash = ghosts.remove(base)
    return hash.Ghost
}

// register base objects

ghost.hash = ghost.register(hash, function(self){
    return type(self) === "object"
})

ghost.list = ghost.register(list, function(self){
    return type(self.length) === "number"
})

ghost.number = ghost.register(number, function(self){
    return type(self) === "number"
})

ghost.string = ghost.register(string, function(self){
    return type(self) === "string"
})

ghost.map = ghost.register(map, function(self){
    return self instanceof map
})

// export ghost
module.exports = ghost
