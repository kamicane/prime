/*
regexp
*/"use strict"

var regexp = require("./_shell").regexp
var proto = RegExp.prototype

regexp.implement({
    exec: proto.exec,
    test: proto.test,
    toString: proto.toString
})

module.exports = regexp
