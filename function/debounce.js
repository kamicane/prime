"use strict"

var debounce = function(fn, timeout, context){
    var timer
    return function(){
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(context, args)
        }, timeout || 100)
    }
}

module.exports = debounce
