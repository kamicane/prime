/*
string:capitalize
*/"use strict"

var capitalize = function(self){
    return (self + "").replace(/\b[a-z]/g, function(match){
        return match.toUpperCase()
    })
}

module.exports = capitalize
