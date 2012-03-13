/*
Object shell
*/

var object = require("../util/shell")(Object),
	hop = Object.hasOwnProperty

object.hasOwnProperty = function(self, key){
	return hop.call(self, key)
}

object.extend("defineProperty", /*(es5 && object.defineProperty)?*/function(self, name, descriptor){
	self[name] = descriptor.value
	return self
}/*:null*/)

object.extend("create", /*(es5 && object.create)?*/function(self){
	var F = function(){}
	F.prototype = self
	return new F
}/*:null*/)

object.implement("keys", /*(es5 && object.keys)?*/function(){
	var keys = []
	for (var key in this) if (object.hasOwnProperty(this, key)) keys.push(key)
	return keys
}/*:null*/)

module.exports = object
