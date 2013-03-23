/*
array:map
*/"use strict"

var map = function(self, method, context){
    var length = self.length >>> 0, results = Array(length)
    for (var i = 0, l = length; i < l; i++){
        results[i] = method.call(context, self[i], i, self)
    }
    return results
}

module.exports = map
