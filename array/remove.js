/*
array:remove
*/"use strict"

var splice = Array.prototype.splice

var remove = function(self, item){
    var io = -1
    for (var i = 0, l = self.length >>> 0; i < l; i++){
        if (self[i] === item) return !splice.call(self, io = i, 1)
    }
    return io
}

module.exports = remove
