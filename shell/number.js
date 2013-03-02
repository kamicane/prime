/*
number
 - number shell
*/"use strict"

var number = require("../es5/number")

module.exports = number.implementGenerics({

    limit: function(self, min, max){
        return Math.min(max, Math.max(min, self));
    },

    round: function(self, precision){
        precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0)
        return Math.round(self * precision) / precision
    },

    times: function(self, fn, context){
        for (var i = 0; i < self; i++) fn.call(context, i, null, self)
        return self
    },

    random: function(self, max){
        return Math.floor(Math.random() * (max - self + 1) + self)
    }

})
