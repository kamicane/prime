/*
string methods
 - string shell
*/"use strict"

var string = require("../es5/string")

string.implementGenerics({

    clean: function(self){
        return string.trim((self + "").replace(/\s+/g, " "))
    },

    camelize: function(self){
        return (self + "").replace(/-\D/g, function(match){
            return match.charAt(1).toUpperCase()
        })
    },

    hyphenate: function(self){
        return (self + "").replace(/[A-Z]/g, function(match){
            return '-' + match.toLowerCase()
        })
    },

    capitalize: function(self){
        return (self + "").replace(/\b[a-z]/g, function(match){
            return match.toUpperCase()
        })
    },

    escape: function(self){
        return (self + "").replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    },

    number: function(self){
        return parseFloat(self)
    }

})

if (typeof JSON !== "undefined") string.implement({decode: function(){
    return JSON.parse(this)
}})

module.exports = string
