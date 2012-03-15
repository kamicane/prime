/*
String shell
*/

var shell = require("../util/shell")

var proto = String.prototype

var string = shell().implement({
	trim: proto.trim/*(es5 && string.trim)?*/ || function(){
		return (this + '').replace(/^\s+|\s+$/g, '')
	}/*:*/
})

var names = "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase".split(",")
for (var i = 0, name, method; name = names[i++];) if ((method = proto[name])) string.implement(name, method)

module.exports = string
