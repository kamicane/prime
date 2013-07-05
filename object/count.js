/*
object:count
*/"use strict"

var forIn = require("./forIn")

var count = function(self){
    var length = 0
    forIn(self, function(){
        length++
    })
    return length
}

module.exports = count
