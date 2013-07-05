/*
number:random
*/"use strict"

var random = function(self, max){
    return Math.floor(Math.random() * (max - self + 1) + self)
}

module.exports = random
