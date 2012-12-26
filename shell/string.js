/*
string methods
 - string shell
*/"use strict"

var shell = require("../shell/")

var string = shell({

    inherits: require("../es5/string"),

    /*(string.clean)?*/
    clean: function(){
        return string.trim((this + '').replace(/\s+/g, ' '))
    },/*:*/

    /*(string.camelize)?*/
    camelize: function(){
        return (this + '').replace(/-\D/g, function(match){
            return match.charAt(1).toUpperCase()
        })
    },/*:*/

    /*(string.hyphenate)?*/
    hyphenate: function(){
        return (this + '').replace(/[A-Z]/g, function(match){
            return '-' + match.toLowerCase()
        })
    },/*:*/

    /*(string.capitalize)?*/
    capitalize: function(){
        return (this + '').replace(/\b[a-z]/g, function(match){
            return match.toUpperCase()
        })
    },/*:*/

    /*(string.escape)?*/
    // « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js
    escape: function(){
        return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
    },/*:*/

    /*(string.number)?*/
    number: function(){
        return parseFloat(this)
    }/*:*/

})

/*(string.decode)?*/
if (typeof JSON !== 'undefined') string.implement({decode: function(){
    return JSON.parse(this)
}})/*:*/

module.exports = string
