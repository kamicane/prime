/*
object:mixIn
*/"use strict"

var forOwn = require("./forOwn")

var copy = function(value, key){
    this[key] = value
}

var mixIn = function(self){
    for (var i = 1, l = arguments.length; i < l; i++) forOwn(arguments[i], copy, self)
    return self
}

module.exports = mixIn
