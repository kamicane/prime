/*
ghost
*/"use strict"

var prime  = require("../prime/"),
    typeOf = require("../util/type")

var shells = {
    "string"   : require("../shell/string"),
    "number"   : require("../shell/number"),
    "array"    : require("../shell/array"),
    "object"   : require("../shell/object"),
    "date"     : require("../shell/date"),
    "function" : require("../shell/function"),
    "regexp"   : require("../shell/regexp")
}

module.exports = function(typeCheck){

    if (!typeCheck) typeCheck = typeOf

    var ƒ = function(self){
        if (self == null || self instanceof ghost) return self
        var g = ƒ[typeCheck(self)]
        return (g) ? new g(self) : self
    }

    var ghost = prime({

        define: function(key, descriptor){
            var method = descriptor.value

            if (typeof method === "function") descriptor.value = function(){
                return ƒ(method.apply(this.valueOf(), arguments))
            }

            prime.define(this.prototype, key, descriptor)
            return this
        }

    })

    ƒ.register = function(type, shell){

        var g = ƒ[type] = prime({

            inherits: ghost,

            constructor: function ghost(self){
                if (!this || this.constructor !== g) return new g(self)

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

        return g.implement(shell.prototype)

    }

    for (var type in shells) ƒ.register(type, shells[type])

    return ƒ

}
