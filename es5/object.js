/*
Object shell
*/

var object = require("../util/ghost").object

/*(es5 && object.defineProperty)?*/
if (!object.defineProperty) object.extend("defineProperty", function(self, name, descriptor){
	self[name] = descriptor.value
	return self
})/*:*/

/*(es5 && object.create)?*/
if (!object.create) object.extend("create", function(self){
	var F = function(){}
	F.prototype = self
	return new F
})/*:*/

/*(es5 && object.keys)?*/
if (!object.keys) object.extend("keys", function(self){
	var keys = []
	for (var key in self) if (object.hasOwnProperty(this, key)) keys.push(key)
	return keys
})/*:*/

module.exports = object
