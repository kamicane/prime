"use strict"

var defer = require('../defer')

var debounce = function(fn, timeout, context){
    var clear = function(){}
    return function(){
        var args = arguments
        clear()
        clear = defer.timeout(function(){
            fn.apply(context, args)
        }, timeout || 100)
    }
}

module.exports = debounce
