/*
shell
*/"use strict"

var prime = require("../prime/"),
    slice = Array.prototype.slice

var shell = prime({

    define: function(key, descriptor){
        var method = descriptor.value

        if (typeof method === "function") this[key] = function(self){
            var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
            return method.apply(self, args)
        }

        prime.define(this.prototype, key, descriptor)

        return this
    },

    constructor: {prototype: {}}

})

module.exports = function(proto){
    var inherits = proto.inherits || (proto.inherits = shell)
    proto.constructor = prime.create(inherits)
    return prime(proto)
}
