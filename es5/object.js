/*
object
 - object shell
*/"use strict"

var object = require("../util/shell")()

var names = "hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Object.prototype[name])) methods[name] = method

module.exports = object.implement(methods)
