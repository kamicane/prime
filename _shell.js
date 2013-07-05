/*
shell
*/"use strict"

var prime = require("./index"),
    type  = require("./type"),
    forIn = require("./object/forIn")

var slice = Array.prototype.slice,
    push  = Array.prototype.push

var ghost = prime({

    constructor: function ghost(self){

        this.valueOf = function(){
            return self
        }

        this.toString = function(){
            return self + ""
        }

        this.is = function(object){
            return self === object
        }

        this.get = function(index){
            return self[index]
        }

        this.set = function(index, value){
            self[index] = value
            return self
        }
    }

})

var shell = function(self){
    if (self == null || self instanceof ghost) return self
    var g = shell[type(self)]
    return (g) ? new g(self) : self
}

var register = function(){

    var g = prime({inherits: ghost})

    var s = prime(function(self){
        return new g(self)
    })

    s.extend = function(object){

        var self = this

        forIn(object, function(method, key){

            this[key] = method

            this.prototype[key] = function(){
                if (!arguments.length) return method.call(self, this)
                var args = [this]
                push.apply(args, arguments)
                return method.apply(self, args)
            }

            g.prototype[key] = function(){
                var value = this.valueOf()
                if (!arguments.length) return method.call(self, value)
                var args = [value]
                push.apply(args, arguments)
                return method.apply(self, args)
            }

        }, this)

        return this
    }

    s.implement = function(object){

        forIn(object, function(method, key){

            this[key] = function(self){
                return (arguments.length > 1) ? method.apply(self, slice.call(arguments, 1)) : method.call(self)
            }

            g.prototype[key] = function(){
                return shell(method.apply(this.valueOf(), arguments))
            }

            this.prototype[key] = method

        }, this)

        return this
    }

    return s

}

for (var types = ["string", "number", "array", "object", "date", "function", "regexp"], i = types.length; i--;) shell[types[i]] = register()

module.exports = shell
