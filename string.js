/*
string
*/"use strict"

var string = require("./_shell").string
var proto = String.prototype

string.implement({
    charAt: proto.charAt,
    charCodeAt: proto.charCodeAt,
    concat: proto.concat,
    indexOf: proto.indexOf,
    lastIndexOf: proto.lastIndexOf,
    match: proto.match,
    replace: proto.replace,
    search: proto.search,
    slice: proto.slice,
    split: proto.split,
    substr: proto.substr,
    substring: proto.substring,
    toLowerCase: proto.toLowerCase,
    toUpperCase: proto.toUpperCase,
    toString: proto.toString,
    valueOf: proto.valueOf
})

string.extend({
    camelize: require("./string/camelize"),
    capitalize: require("./string/capitalize"),
    clean: require("./string/clean"),
    escape: require("./string/escape"),
    hyphenate: require("./string/hyphenate"),
    trim: require("./string/trim")
})

module.exports = string
