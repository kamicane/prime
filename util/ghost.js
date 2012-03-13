/*
ghost
*/

var type = require("./type")

var boxed = {},
	slice = Array.prototype.slice

var ghost = function(self){
	var name = type(self)
	if (name === "list") name = "array"
	var box = boxed[name]
	return box ? new box(self) : self
}

var define = function(name, base, methods, generics){

	var proto = base.prototype

	methods = methods ? methods.split(",") : null
	generics = generics ? generics.split(",") : null

	var box = boxed[name] = function(self){
		this.valueOf = function(){
			return self
		}
		this.toString = function(){
			return self + ""
		}
		this.type = function(){
			return name
		}
	}

	var boxproto = box.prototype

	var implement = function(key, method, generic){
		if (type(key) !== 'string') for (var k in key) implement(k, key[k], method)
		else if (method){
			boxproto[key] = generic ? function(){
				return ghost(method.apply(base, [this.valueOf()].concat(arguments)))
			} : function(){
				return ghost(method.apply(this.valueOf(), arguments))
			}
			box[key] = generic ? method : function(self){
				var args = slice.call(arguments)
				return method.apply(args.shift(), args)
			}
		}
		return box
	}

	box.extend = function(key, method){
		return implement(key, method, true)
	}

	box.implement = function(key, method){
		return implement(key, method)
	}

	if (methods) for (var i = 0, method; method = methods[i]; i++) box.implement(method, proto[method])
	if (generics) for (var i = 0, generic; generic = generics[i]; i++) box.extend(generic, base[generic])

	box.toString = function(self){
		return proto.toString.call(self)
	}

	box.valueOf = function(self){
		return proto.valueOf.call(self)
	}

	return ghost[name] = box

}

ghost.define = function(name, base){
	return define(name, base)
}

define("array", Array, "pop,push,reverse,shift,sort,splice,unshift,concat,join,slice,lastIndexOf,reduce,reduceRight," +
	"filter,indexOf,map,every,some,forEach", "isArray")

define("string", String, "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice," +
	"split,substr,substring,toLowerCase,toUpperCase,trim")

define("method", Function, "call,apply")

define("object", Object, "hasOwnProperty", "create,keys,defineProperty,defineProperties,getPrototypeOf," +
	"getOwnPropertyDescriptor,getOwnPropertyNames,preventExtensions,isExtensible,seal,isSealed,freeze,isFrozen")

define("regexp", RegExp, "test,exec")

define("number", Number, "toExponential,toFixed,toLocaleString,toPrecision")

module.exports = ghost
