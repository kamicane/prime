"use strict"

var compose = function(f){
    var fns = arguments, l = fns.length
    if (l == 1) return f
    return function(x){
        while (l--){
            x = fns[l](x)
        }
        return x
    }
}

module.exports = compose
