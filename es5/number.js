/*
Number
*/"use strict"

var shell = require("../util/shell")

var proto = Number.prototype

var number = shell()

var names = "toExponential,toFixed,toLocaleString,toPrecision".split(",")
for (var i = 0, name, method; name = names[i++];) if ((method = proto[name])) number.implement(name, method)

module.exports = number
