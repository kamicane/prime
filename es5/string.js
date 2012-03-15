/*
String shell
*/"use strict"

var proto = String.prototype

var string = require("../util/shell")().implement({

	trim: proto.trim/*(es5 && string.trim)?*/ || function(){
		return (this + '').replace(/^\s+|\s+$/g, '')
	}/*:*/

})

var methods = {}
var names = "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase".split(",")
for (var i = 0, name, method; name = names[i++];) if ((method = proto[name])) methods[name] = method
string.implement(methods)

module.exports = string
