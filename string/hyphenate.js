/*
string:hyphenate
*/"use strict"

var hyphenate = function(self){
    return (self + "").replace(/[A-Z]/g, function(match){
        return '-' + match.toLowerCase()
    })
}

module.exports = hyphenate
