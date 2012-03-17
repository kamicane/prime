/*
Object
*/"use strict"

var shell = require("../util/shell"),
	prime = require("../prime")

var object = shell({
	hasOwnProperty: Object.hasOwnProperty
})

object.hasOwnProperty = prime.has

module.exports = object
