/*
string:camelize
*/"use strict"

var camelize = function(self){
    return (self + "").replace(/-\D/g, function(match){
        return match.charAt(1).toUpperCase()
    })
}

module.exports = camelize
