/*
shell
*/"use strict"

var prime = require("../prime/"),
    type  = require("../util/type")

var slice = Array.prototype.slice

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
    }

})

var shell = function(self){
    if (self == null || self instanceof ghost) return self
    var g = shell[type(self)]
    return (g) ? new g(self) : self
}

var register = function(){

    var g = prime({inherits: ghost})

    return prime({

        constructor: function(self){
            return new g(self)
        },

        define: function(key, descriptor){
            var method = descriptor.value

            this[key] = function(self){
                return (arguments.length > 1) ? method.apply(self, slice.call(arguments, 1)) : method.call(self)
            }

            g.prototype[key] = function(){
                return shell(method.apply(this.valueOf(), arguments))
            }

            prime.define(this.prototype, key, descriptor)

            return this
        }

    })

}

for (var types = "string,number,array,object,date,function,regexp".split(","), i = types.length; i--;) shell[types[i]] = register()

module.exports = shell
