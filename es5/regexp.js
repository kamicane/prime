/*
RegExp
*/"use strict"

var proto = RegExp.prototype

module.exports = require("../util/shell")().implement({test: proto.test, exec: proto.exec})
