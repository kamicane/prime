/*
array:filter
*/"use strict"

var filter = function(self, method, context){
    var results = []
    for (var i = 0, l = self.length >>> 0; i < l; i++) {
        var value = self[i]
        if (method.call(context, value, i, self)) results.push(value)
    }
    return results
}

module.exports = filter
