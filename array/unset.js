/*
array:unset
*/"use strict"

var splice = Array.prototype.splice

var unset = function(self, index){
    var split = splice.call(self, index, 1)
    return split.length ? split[0] : null
}

module.exports = unset
