/*
function
 - function es5 shell
*/"use strict"

var function_ = require("../shell/")["function"]

var names = "apply,bind,call,isGenerator,toString".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Function.prototype[name])) methods[name] = method

module.exports = function_.implement(methods)
