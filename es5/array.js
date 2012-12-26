/*
array
 - array es5 shell
*/"use strict"

var array = require("../shell/")()

var names = (
    "pop,push,reverse,shift,sort,splice,unshift,concat,join,slice,toString,indexOf,lastIndexOf,forEach,every,some" +
    ",filter,map,reduce,reduceRight"
).split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Array.prototype[name])) methods[name] = method

if (!methods.filter) methods.filter = function(fn, context){
    var results = []
    for (var i = 0, l = this.length >>> 0; i < l; i++) if (i in this){
        var value = this[i]
        if (fn.call(context, value, i, this)) results.push(value)
    }
    return results
}

if (!methods.indexOf) methods.indexOf = function(item, from){
    for (var l = this.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
        if ((i in this) && this[i] === item) return i
    }
    return -1
}

if (!methods.map) methods.map = function(fn, context){
    var length = this.length >>> 0, results = Array(length)
    for (var i = 0, l = length; i < l; i++){
        if (i in this) results[i] = fn.call(context, this[i], i, this)
    }
    return results
}

if (!methods.every) methods.every = function(fn, context){
    for (var i = 0, l = this.length >>> 0; i < l; i++){
        if ((i in this) && !fn.call(context, this[i], i, this)) return false
    }
    return true
}

if (!methods.some) methods.some = function(fn, context){
    for (var i = 0, l = this.length >>> 0; i < l; i++){
        if ((i in this) && fn.call(context, this[i], i, this)) return true
    }
    return false
}

if (!methods.forEach) methods.forEach = function(fn, context){
    for (var i = 0, l = this.length >>> 0; i < l; i++){
        if (i in this) fn.call(context, this[i], i, this)
    }
}

var toString = Object.prototype.toString

array.isArray = Array.isArray || function(self){
    return toString.call(self) === "[object Array]"
}

module.exports = array.implement(methods)
