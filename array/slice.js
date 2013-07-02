/*
array:slice
*/"use strict"

var slice = function(self, begin, end){
    var length = self.length, end_
    if (begin == null) begin = 0
    end = (end == null) ? length : ((end_ = end % length) < 0) ? end_ + length : end;
    var slit = []
    for (var i = begin; i < end; i++) slit.push(self[i])
    return slit
}

module.exports = slice
