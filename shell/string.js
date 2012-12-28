/*
string methods
 - string shell
*/"use strict"

var string = require("../es5/string")

string.implement({

    clean: function(){
        return string.trim((this + "").replace(/\s+/g, " "))
    },

    camelize: function(){
        return (this + "").replace(/-\D/g, function(match){
            return match.charAt(1).toUpperCase()
        })
    },

    hyphenate: function(){
        return (this + "").replace(/[A-Z]/g, function(match){
            return '-' + match.toLowerCase()
        })
    },

    capitalize: function(){
        return (this + "").replace(/\b[a-z]/g, function(match){
            return match.toUpperCase()
        })
    },

    escape: function(){
        return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    },

    number: function(){
        return parseFloat(this)
    }

})

if (typeof JSON !== "undefined") string.implement({decode: function(){
    return JSON.parse(this)
}})

module.exports = string
