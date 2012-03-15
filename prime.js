// require pretty much everything that isnt internal

var type = require("./util/type")

var array = require("./types/array")
var object = require("./types/object")
var string = require("./types/string")
var method = require("./types/method")
var number = require("./types/number")
var regexp = require("./types/regexp")

var json = require("./es5/json")

var map = require("./map")
var Class = require("./class")
var Emitter = require("./class/emitter")

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
	return type(self) === "list" && type(self.values) === "array" && type(self.keys) === "array"
}, map)

// attach misc stuff to ghost

ghost.array = array
ghost.number = number
ghost.string = string
ghost.object = object
ghost.regexp = regexp
ghost.method = method

ghost.map = map

ghost.type = type
ghost.Class = Class
ghost.Emitter = Emitter
ghost.JSON = json

// export ghost

module.exports = ghost
