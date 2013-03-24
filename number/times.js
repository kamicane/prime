/*
number:times
*/"use strict"

var times = function(self, method, context){
    for (var i = 0; i < this; i++) method.call(context, i, null, self)
    return self
}

module.exports = times
