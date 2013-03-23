/*
object:forIn
*/"use strict"

var has = require("./hasOwn")

var forIn = function(object, method, context){
    for (var key in object) if (method.call(context, object[key], key, object) === false) break
    return object
}

if (!({valueOf: 0}).propertyIsEnumerable("valueOf")){ // fix for stupid IE enumeration bug

    var buggy = "constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString".split(",")
    var proto = Object.prototype

    forIn = function(object, method, context){
        for (var key in object) if (method.call(context, object[key], key, object) === false) return object
        for (var i = 0; key = buggy[i]; i++){
            var value = object[key]
            if ((value !== proto[key] || has(object, key)) && method.call(context, value, key, object) === false) break
        }
        return object
    }

}

module.exports = forIn
