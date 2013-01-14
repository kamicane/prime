/*
date
 - date es5 shell
*/"use strict"

var date = require("../shell/index")["date"]

var names = (
    "getDate,getDay,getFullYear,getHours,getMilliseconds,getMinutes,getMonth,getSeconds,getTime,getTimezoneOffset" +
    ",getUTCDate,getUTCDay,getUTCFullYear,getUTCHours,getUTCMilliseconds,getUTCMinutes,getUTCMonth,getUTCSeconds,setDate,setFullYear" +
    ",setHours,setMilliseconds,setMinutes,setMonth,setSeconds,setTime,setUTCDate,setUTCFullYear,setUTCHours,setUTCMilliseconds" +
    ",setUTCMinutes,setUTCMonth,setUTCSeconds,toDateString,toISOString,toJSON,toLocaleDateString,toLocaleFormat,toLocaleString" +
    ",toLocaleTimeString,toString,toTimeString,toUTCString,valueOf"
).split(",")

date.now = Date.now || function(){
    return +(new Date)
}

for (var methods = {}, i = 0, name, method; name = names[i++];) if ((method = Date.prototype[name])) methods[name] = method

module.exports = date.implement(methods)
