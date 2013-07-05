/*
object:some
*/"use strict"

var forIn = require("./forIn")

var some = function(self, method, context){
    var some = false
    forIn(self, function(value, key){
        if (!some && method.call(context, value, key, self)) return !(some = true)
    })
    return some
}

module.exports = some
