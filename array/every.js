/*
array:every
*/"use strict"

var every = function(self, method, context){
    for (var i = 0, l = self.length >>> 0; i < l; i++){
        if (!method.call(context, self[i], i, self)) return false
    }
    return true
}

module.exports = every
