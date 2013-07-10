/*
function
*/"use strict"

var function_ = require("./_shell")["function"]
var proto = Function.prototype

function_.implement({
    apply:    proto.apply,
    call:     proto.call,
    toString: proto.toString
})

function_.extend({
    bind:        require("./function/bind"),
    compose:     require("./function/compose"),
    curry:       require("./function/curry"),
    partial:     require("./function/partial"),
    partialLast: require("./function/partialLast"),
})

module.exports = function_
