/*
box
*/

var type = require("./type"),
	object = require("../es5/object")

var box = function(self){
	var boxee = box[type(self)]
	return boxee ? new boxee(self) : self
}

box.prototype.toString = function(){
	return this.valueOf() + ""
}

box.define = function(type, obj){

	var boxee = box[type] = function(self){
		this.valueOf = function(){
			return self
		}
	}

	boxee.prototype = object.create(box.prototype)

	for (var p in obj.prototype) (function(name, method){
		boxee.prototype[name] = function(){
			return box(method.apply(this.valueOf(), arguments))
		}
	})(p, obj.prototype[p])

}

module.exports = box
