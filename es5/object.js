/*
object
 - object es5 shell
*/"use strict"

var object = require("../shell/")["object"]

var names = "hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Object.prototype[name])) methods[name] = method

module.exports = object.implement(methods)
