/*
array:remove
*/"use strict"

var splice = Array.prototype.splice
var indexOf = require("./indexOf")

var remove = function(self, item){
    var io = indexOf(self, item)
    if (io !== -1) splice.call(self, io, 1)
    return io
}

module.exports = remove
