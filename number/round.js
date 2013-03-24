/*
number:round
*/"use strict"

var round = function(self, precision){
    precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0)
    return Math.round(self * precision) / precision
}

module.exports = round
