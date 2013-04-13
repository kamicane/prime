/*
number
 - number es5 shell
*/"use strict"

var number = require("./_shell")["number"]
var proto = Number.prototype

number.implement({
    toExponential: proto.toExponential,
    toFixed: proto.toFixed,
    toLocaleString: proto.toLocaleString,
    toPrecision: proto.toPrecision,
    toString: proto.toString,
    valueOf: proto.valueOf
})

number.extend({
    limit:  require("./number/limit")
    random: require("./number/random")
    round:  require("./number/round")
    times:  require("./number/times")
})

module.exports = number
