/*
array:some
*/"use strict"

var some = function(self, method, context){
    for (var i = 0, l = self.length >>> 0; i < l; i++){
        if (method.call(context, self[i], i, self)) return true
    }
    return false
}

module.exports = some
