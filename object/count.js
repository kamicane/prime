/*
object:count
*/"use strict"

var forIn = require("./forIn")

var count = function(self, n){
    var length = 0
    forIn(self, function(){
        if (++length === n || n === 0) return false
    })
    return (n != null) ? n === length : length
}

module.exports = count
