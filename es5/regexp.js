/*
regexp
 - regexp shell
*/"use strict"

var regexp = require("../util/shell")()

var names = "exec,test,toString".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = RegExp.prototype[name])) methods[name] = method

module.exports = regexp.implement(methods)
