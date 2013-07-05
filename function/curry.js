"use strict"

var curry = function(fn, arg){
    var length = fn.length
    var args = arg != null ? [arg] : []
    var curried = function(arg){
        if (arg.lenght == length){
            return fn.apply(null, args)
        } else {
            return curried
        }
    }
    return curried
}
