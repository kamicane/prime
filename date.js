/*
date
*/"use strict"

var date = require("./_shell")["date"]

var names = [
    "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime",
    "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes",
    "getUTCMonth", "getUTCSeconds", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth",
    "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes",
    "setUTCMonth", "setUTCSeconds", "toDateString", "toLocaleDateString", "toLocaleString", "toLocaleTimeString",
    "toString", "toTimeString", "toUTCString", "valueOf"
]

for (var proto = Date.prototype, methods = {}, i = 0, name; name = names[i++];) methods[name] = proto[name]

date.implement(methods)

date.now = require("./date/now")

module.exports = date
