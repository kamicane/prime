/*
date
*/"use strict"

var date = require("./_shell")["date"]

var names = (
    "getDate,getDay,getFullYear,getHours,getMilliseconds,getMinutes,getMonth,getSeconds,getTime,getTimezoneOffset" +
    ",getUTCDate,getUTCDay,getUTCFullYear,getUTCHours,getUTCMilliseconds,getUTCMinutes,getUTCMonth,getUTCSeconds,setDate,setFullYear" +
    ",setHours,setMilliseconds,setMinutes,setMonth,setSeconds,setTime,setUTCDate,setUTCFullYear,setUTCHours,setUTCMilliseconds" +
    ",setUTCMinutes,setUTCMonth,setUTCSeconds,toDateString,toISOString,toJSON,toLocaleDateString,toLocaleString" +
    ",toLocaleTimeString,toString,toTimeString,toUTCString,valueOf"
).split(",")

for (var methods = {}, i = 0, name; name = names[i++];) methods[name] = Date.prototype[name]

date.implement(methods)

date.now = require("./date/now")

module.exports = date
