/*
array:slice
*/"use strict"

var slice = function(self, begin, end){
    var length = self.length
    if (begin == null) begin = 0
    end = (end == null) ? length : ((end %= length) < 0) ? end + length : end;
    var slit = []
    for (var i = begin; i < end; i++) slit.push(self[i])
    return slit
}

module.exports = slice
