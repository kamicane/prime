/*
main
- rquire everything, attach to prime
*/"use strict"

var prime = require("./prime")
var type = require("./util/type")

var map = require("./collection/map")
var list = require("./collection/list")
var hash = require("./collection/hash")

var string = require("./types/string")
var number = require("./types/number")

var ghost = require("./util/ghost")()

prime.type = type

prime.map = map
prime.list = list
prime.hash = hash

prime.string = string
prime.number = number

prime.ghost = ghost

ghost.register(function(self){
	return self && (type(self) === "array" || type(self.length) === "number")
}, list)

ghost.register(function(self){
	return type(self) === "object"
}, hash)

ghost.register(function(self){
	return type(self) === "number"
}, number)

ghost.register(function(self){
	return type(self) === "string"
}, string)

ghost.register(function(self){
	return self && self.toString() == "[object Map]"
}, map)

module.exports = prime
