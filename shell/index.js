/*
shell
*/"use strict"

var prime = require("../prime/"),
    slice = Array.prototype.slice

var base = prime({

    constructor: {prototype: {}},

    define: function(key, descriptor){

        var method = descriptor.value

        if (typeof method === "function") this[key] = function(self){
            var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
            return method.apply(self, args)
        }

        prime.define(this.prototype, key, descriptor)

        return this
    }

})

module.exports = function(proto){
    if (!proto) proto = {}
    var inherits = proto.inherits || (proto.inherits = base)
    proto.constructor = prime.create(inherits)
    return prime(proto)
}
