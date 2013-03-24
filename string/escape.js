/*
string:escape
*/"use strict"

var escape = function(self){
    return (self + "").replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
}

module.exports = escape
