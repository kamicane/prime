/*
object:hasOwn
*/"use strict"

var hasOwnProperty = Object.hasOwnProperty

var hasOwn = function(self, key){
    return hasOwnProperty.call(self, key)
}

module.exports = hasOwn
