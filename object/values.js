/*
object:values
*/"use strict"

var forIn = require("./forIn")

var values = function(self){
    var values = []
    forIn(self, function(value, key){
        values.push(value)
    })
    return values
}

module.exports = values
