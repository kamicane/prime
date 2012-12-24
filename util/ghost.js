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

ghost.register = function(name, base, responder){

    ghosts.remove(name)

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

    if (!responder) responder = function(self){
        return type(self) === name
    }

    ghosts.set(name, {base: base, ghost: Ghost, responder: responder})

    return ghost[name] = Ghost

}

ghost.unregister = function(name){
    var hash = ghosts.remove(name)
    delete ghost[name]
    return hash.Ghost
}

// register base objects

ghost.register("hash", hash, function(self){
    return type(self) === "object"
})

ghost.register("list", list, function(self){
    return type(self.length) === "number"
})

ghost.register("number", number)
ghost.register("string", string)
ghost.register("map", map)

// export ghost
module.exports = ghost
