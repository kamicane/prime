/*
object
*/"use strict"

var object = require("./_shell").object
var proto = Object.prototype

object.implement({
    hasOwnProperty: proto.hasOwnProperty,
    toString:       proto.toString,
    valueOf:        proto.valueOf
})

object.extend({
    count:   require("./object/count"),
    create:  require("./object/create"),
    every:   require("./object/every"),
    filter:  require("./object/filter"),
    forIn:   require("./object/forIn"),
    forOwn:  require("./object/forOwn"),
    hasOwn:  require("./object/hasOwn"),
    indexOf: require("./object/indexOf"),
    keys:    require("./object/keys"),
    map:     require("./object/map"),
    mixIn:   require("./object/mixIn"),
    remove:  require("./object/remove"),
    some:    require("./object/some"),
    values:  require("./object/values")
})

module.exports = object
