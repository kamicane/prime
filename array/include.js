/*
array:include
*/"use strict"

var push = Array.prototype.push
var indexOf = require("./indexOf")

var include = function(self, item){
    var io = indexOf(self, item)
    if (io === -1) return push.call(self, item) - 1
    return io
}

module.exports = include
