/*
function
*/"use strict"

var function_ = require("./_shell")["function"]
var proto = Function.prototype

function_.implement({
    apply:    proto.apply
    call:     proto.call
    toString: proto.toString
})

function_.extend({
    bind:     require("./function/bind"),
    throttle: require("./function/throttle"),
    debounce: require("./function/debounce")
})

module.exports = function_
