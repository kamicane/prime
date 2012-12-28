/*
number
 - number es5 shell
*/"use strict"

var number = require("../shell/")["number"]

var names = "toExponential,toFixed,toLocaleString,toPrecision,toString,valueOf".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Number.prototype[name])) methods[name] = method

module.exports = number.implement(methods)
