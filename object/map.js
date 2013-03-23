/*
object:map
*/"use strict"

var forIn = require("./forIn")

var map = function(self, method, context){
    var results = {}
    forIn(self, function(value, key){
        results[key] = method.call(context, value, key, self)
    })
    return results
}

module.exports = map
