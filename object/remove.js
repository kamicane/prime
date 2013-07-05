/*
object:remove
*/"use strict"

var forIn = require("./forIn")

var remove = function(self, item){
    var ko = null
    forIn(self, function(value, key){
        if (value === item) return !(delete self[ko = key])
    })
    return ko
}

module.exports = remove
