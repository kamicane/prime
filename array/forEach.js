/*
array:forEach
*/"use strict"

var forEach = function(self, method, context){
    for (var i = 0, l = self.length >>> 0; i < l; i++){
        if (method.call(context, self[i], i, self) === false) break
    }
    return self
}

module.exports = forEach
