/*
number
 - number es5 shell
*/"use strict"

var number = require("./_shell").number
var proto = Number.prototype

number.implement({
    toExponential: proto.toExponential,
    toFixed: proto.toFixed,
    toPrecision: proto.toPrecision
})

number.extend({
    limit:  require("./number/limit"),
    random: require("./number/random"),
    round:  require("./number/round"),
    times:  require("./number/times")
})

module.exports = number
