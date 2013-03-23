/*
object:keys
*/"use strict"

var forIn = require("./forIn")

var keys = function(self){
    var keys = []
    forIn(self, function(value, key){
        keys.push(key)
    })
    return keys
}

module.exports = keys
