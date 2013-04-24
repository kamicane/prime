/*
array:slice
*/"use strict"

var proto = Array.prototype.slice

var slice = function(self, begin, end){
    return proto.call(self, begin, end)
}

module.exports = slice
