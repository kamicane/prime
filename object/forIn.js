/*
object:forIn
*/"use strict"

var has = require("./hasOwn")

var forIn = function(self, method, context){
    for (var key in self) if (method.call(context, self[key], key, self) === false) break
    return self
}

if (!({valueOf: 0}).propertyIsEnumerable("valueOf")){ // fix for stupid IE enumeration bug

    var buggy = "constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString".split(",")
    var proto = Object.prototype

    forIn = function(self, method, context){
        for (var key in self) if (method.call(context, self[key], key, self) === false) return self
        for (var i = 0; key = buggy[i]; i++){
            var value = self[key]
            if ((value !== proto[key] || has(self, key)) && method.call(context, value, key, self) === false) break
        }
        return self
    }

}

module.exports = forIn
