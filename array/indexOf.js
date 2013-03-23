/*
array:indexOf
*/"use strict"

var indexOf = function(self, item, from){
    for (var l = self.length >>> 0, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
        if (self[i] === item) return i
    }
    return -1
}

module.exports = indexOf
