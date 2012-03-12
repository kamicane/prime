/*
Object shell
*/

var object = require("../util/shell")(Object),
	hop = Object.hasOwnProperty
	
object.hasOwnProperty = function(self, key){
	return hop.call(self, key)
}

//=object.defineProperty
object.extend("defineProperty", function(self, name, descriptor){
	self[name] = descriptor.value
	return self
})//.

//=object.create
object.extend("create", function(self){
	var F = function(){}
	F.prototype = self
	return new F
})//.

//=object.keys
object.implement("keys", function(){
	var keys = []
	for (var key in this) if (object.hasOwnProperty(this, key)) keys.push(key)
	return keys
})//.

module.exports = object
