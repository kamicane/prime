/*
defer
*/"use strict"

var type  = require("./type"),
    uid   = require("./uid"),
    now   = require("./date/now"),
    count = require("./object/count")

var callbacks = {
    timeout: {},
    frame: {},
    immediate: {}
}

var push = function(collection, callback, context, defer){
    var unique = uid()

    var iterator = function(){
        iterate(collection)
    }

    if (count(collection, 0)) defer(iterator)

    collection[unique] = {
        callback: callback,
        context: context
    }

    return function(){
        delete collection[unique]
    }
}

var iterate = function(collection){
    var time = now()

    var exec = {}, key

    for (key in collection){
        exec[key] = collection[key]
        delete collection[key]
    }

    for (key in exec){
        var entry = exec[key]
        entry.callback.call(entry.context, time)
    }
}

var defer = function(callback, argument, context){
    return (type(argument) === "number") ? defer.timeout(callback, argument, context) : defer.immediate(callback, argument)
}

if (global.process && process.nextTick){

    defer.immediate = function(callback, context){
        return push(callbacks.immediate, callback, context, process.nextTick)
    }

} else if (global.setImmediate){

    defer.immediate = function(callback, context){
        return push(callbacks.immediate, callback, context, setImmediate)
    }

} else if (global.postMessage && global.addEventListener){

    addEventListener("message", function(event){
        if (event.source === global && event.data === "@deferred"){
            event.stopPropagation()
            iterate(callbacks.immediate)
        }
    }, true)

    defer.immediate = function(callback, context){
        return push(callbacks.immediate, callback, context, function(){
            postMessage("@deferred", "*")
        })
    }

} else {

    defer.immediate = function(callback, context){
        return push(callbacks.immediate, callback, context, function(iterator){
            setTimeout(iterator, 0)
        })
    }

}

var requestAnimationFrame = global.requestAnimationFrame ||
    global.webkitRequestAnimationFrame ||
    global.mozRequestAnimationFrame ||
    global.oRequestAnimationFrame ||
    global.msRequestAnimationFrame ||
    function(callback) {
        setTimeout(callback, 1e3 / 60)
    }

defer.frame = function(callback, context){
    return push(callbacks.frame, callback, context, requestAnimationFrame)
}

var clear

defer.timeout = function(callback, ms, context){
    var ct = callbacks.timeout

    if (!clear) clear = defer.immediate(function(){
        clear = null
        callbacks.timeout = {}
    })

    return push(ct[ms] || (ct[ms] = {}), callback, context, function(iterator){
        setTimeout(iterator, ms)
    })
}

module.exports = defer
