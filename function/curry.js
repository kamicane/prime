"use strict"

var slice = require("../array/slice")

var curry = function(fn){
    var length = fn.length
    var self = this
    var curried = function(){
        var args = slice(arguments)
        if (args.length >= length) return fn.apply(self, args)
        return function(){
            return curried.apply(self, args.concat(slice(arguments)))
        }
    }
    return curried.apply(self, slice(arguments, 1))
}

module.exports = curry
