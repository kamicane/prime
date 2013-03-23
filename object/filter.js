/*
object:filter
*/"use strict"

var forIn = require("./forIn")

var filter = function(self, method, context){
    var results = {}
    forIn(self, function(value, key){
        if (method.call(context, value, key, self)) results[key] = value
    })
    return results
}

module.exports = filter
