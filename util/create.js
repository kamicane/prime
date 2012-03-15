/*
create
*/"use strict"

module.exports = Object.create/*(es5 && object.create)?*/ || function(self){
	var F = function(){}
	F.prototype = self
	return new F
}/*:*/
