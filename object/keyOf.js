/*
object:keyOf
*/"use strict"

var forIn = require("./forIn")

var keyOf = function(self, value){
    var key = null
    forIn(self, function(match, k){
        if (value === match){
            key = k
            return false
        }
    })
    return key
}

module.exports = keyOf
