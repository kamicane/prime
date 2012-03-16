// require pretty much everything that isnt internal
"use strict"

var prime = require("./prime")

var type = require("./util/type")

var array = require("./types/array")
var object = require("./types/object")
var string = require("./types/string")
var method = require("./types/method")
var number = require("./types/number")
var regexp = require("./types/regexp")

var json = require("./es5/json")

var Map = require("./util/map")
var Emitter = require("./util/emitter")

// instantiate a new ghost

var ghost = require("./util/ghost")()

// and register ghosts

ghost.register(function(self){
	return type(self) === "array"
}, array)

ghost.register(function(self){
	return type(self) === "list"
}, array)

ghost.register(function(self){
	return type(self) === "string"
}, string)

ghost.register(function(self){
	return type(self) === "regexp"
}, regexp)

ghost.register(function(self){
	return type(self) === "method"
}, method)

ghost.register(function(self){
	return type(self) === "number"
}, number)

ghost.register(function(self){
	return type(self) === "object"
}, object)

ghost.register(function(self){
	return type(self) === "list" && type(self._values) === "array" && type(self._keys) === "array"
}, Map)

// attach stuff to prime

prime.array = array
prime.number = number
prime.string = string
prime.object = object
prime.regexp = regexp
prime.method = method

prime.type = type

prime.Map = Map
prime.Emitter = Emitter
prime.JSON = json

prime.ghost = ghost

// export prime

module.exports = prime
