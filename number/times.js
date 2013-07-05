/*
number:times
*/"use strict"

var times = function(self, method, context){
    for (var i = 0; i < self; i++){
        if (method.call(context, i, null, self) === false) break
    }
    return self
}

module.exports = times
