"use strict"

var slice = require('../array/slice')

var partial = function(fn){
    var args = slice(arguments, 1)
    var self = this
    return function(){
        return fn.apply(self, args.concat(slice(arguments)))
    }
}

module.exports = partial
