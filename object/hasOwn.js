/*
object:hasOwn
*/"use strict"

var hasOwn = function(self, key){
    return Object.hasOwnProperty.call(self, key)
}

module.exports = hasOwn
