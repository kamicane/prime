"use strict"

var slice = require('../array/slice')

var partialLast = function(fn){
    var args = slice(arguments, 1)
    var self = this
    return function(data){
        return fn.apply(self, [data].concat(args))
    }
}

module.exports = partialLast
