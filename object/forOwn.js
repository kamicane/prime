/*
object:forOwn
*/"use strict"

var forIn  = require("./forIn"),
    hasOwn = require("./hasOwn")

var forOwn = function(self, method, context){
    forIn(self, function(value, key){
        if (hasOwn(self, key)) return method.call(context, value, key, self)
    })
    return self
}

module.exports = forOwn
