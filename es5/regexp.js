/*
RegExp
*/"use strict"

var shell = require("../util/shell")

var proto = RegExp.prototype

var regexp = shell().implement({test: proto.test, exec: proto.exec})

module.exports = regexp
