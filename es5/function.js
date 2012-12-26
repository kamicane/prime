/*
function
 - function shell
*/"use strict"

var function_ = require("../util/shell")()

var names = "apply,bind,call,isGenerator,toString".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Function.prototype[name])) methods[name] = method

module.exports = function_.implement(methods)
