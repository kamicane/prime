"use strict"

var curry = function(fn, arg){
    var length = fn.length
    var args = arg != null ? [arg] : []
    var self = this
    var curried = function(arg){
        if (args.push(arg) == length){
            return fn.apply(self, args)
        } else {
            return curried
        }
    }
    return curried
}

module.exports = curry
