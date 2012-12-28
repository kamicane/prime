/*
number
 - number shell
*/"use strict"

var number = require("../es5/number")

module.exports = number.implement({

    limit: function(min, max){
        return Math.min(max, Math.max(min, this));
    },

    round: function(precision){
        precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0)
        return Math.round(this * precision) / precision
    },

    times: function(fn, context){
        for (var i = 0; i < this; i++) fn.call(context, i, null, this)
        return this
    },

    random: function(max){
        return Math.floor(Math.random() * (max - this + 1) + this)
    }


})
