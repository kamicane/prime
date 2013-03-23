/*
object:every
*/"use strict"

var forIn = require("./forIn")

var every = function(self, method, context){
    var every = true
    forIn(self, function(value, key){
        if (!method.call(context, value, key, self)) return every = false
    })
    return every
}

module.exports = every
