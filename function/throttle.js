"use strict"

var defer = require('../defer')

var throttle = function(fn, timeout, context){
    var waiting
    return function(){
        if (waiting) return
        fn.apply(context, arguments)
        waiting = true
        defer.timeout(function(){
            waiting = false
        }, timeout || 100)
    }
}

module.exports = throttle
