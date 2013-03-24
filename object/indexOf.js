/*
object:indexOf
*/"use strict"

var forIn = require("./forIn")

var indexOf = function(self, value){
    var key = null
    forIn(self, function(match, k){
        if (value === match){
            key = k
            return false
        }
    })
    return key
}

module.exports = indexOf
