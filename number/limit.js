/*
number:limit
*/"use strict"

var limit = function(self, min, max){
    return Math.min(max, Math.max(min, self))
}

module.exports = limit
