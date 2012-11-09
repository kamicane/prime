/*
number methods
 - inherits from es5/number
*/"use strict"

var shell = require("../util/shell")

var number = shell({

    inherits: require("../es5/number"),

    /*(number.limit)?*/
    limit: function(min, max){
        return Math.min(max, Math.max(min, this));
    },/*:*/

    /*(number.round)?*/
    round: function(precision){
        precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0)
        return Math.round(this * precision) / precision
    },/*:*/

    /*(number.times)?*/
    times: function(fn, context){
        for (var i = 0; i < this; i++) fn.call(context, i, null, this)
        return this
    },/*:*/

    /*(numer.random)?*/
    random: function(max){
        return Math.floor(Math.random() * (max - this + 1) + this)
    }/*:*/


})

module.exports = number
