/*
string:trim
*/"use strict"

var trim = function(self){
    return (self + "").replace(/^\s+|\s+$/g, "")
}

module.exports = trim
