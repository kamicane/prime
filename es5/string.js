/*
string
 - string es5 shell
*/"use strict"

var string = require("../shell/")()

var names = (
    "charAt,charCodeAt,concat,contains,endsWith,indexOf,lastIndexOf,localeCompare,match,replace,search,slice,split" +
    ",startsWith,substr,substring,toLocaleLowerCase,toLocaleUpperCase,toLowerCase,toString,toUpperCase,trim,valueOf"
).split(",")

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = String.prototype[name])) methods[name] = method

if (!methods.trim) methods.trim = function(){
    return (this + '').replace(/^\s+|\s+$/g, '')
}

module.exports = string.implement(methods)
