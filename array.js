/*
array
*/"use strict"

var array = require("./_shell").array
var proto = Array.prototype

array.implement({
    concat:   proto.concat,
    join:     proto.join,
    pop:      proto.pop,
    push:     proto.push,
    reverse:  proto.reverse,
    shift:    proto.shift,
    slice:    proto.slice,
    sort:     proto.sort,
    splice:   proto.splice,
    toString: proto.toString,
    unshift:  proto.unshift
})

array.extend({
    every:       require("./array/every"),
    filter:      require("./array/filter"),
    forEach:     require("./array/forEach"),
    indexOf:     require("./array/indexOf"),
    map:         require("./array/map"),
    remove:      require("./array/remove"),
    some:        require("./array/some")
})

module.exports = array
