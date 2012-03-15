/*
String methods
*/"use strict"

var string = require("../util/shell")(require("../es5/string")).implement({

	/*(string.contains)?*/
	contains: function(string, separator){
		return ((separator) ? (separator + this + separator).indexOf(separator + string + separator) : (this + '').indexOf(string)) > -1
	},/*:*/

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

	/*(string.number)?*/
	number: function(){
		return parseFloat(this)
	}/*:*/

})

/*(string.decode)?*/
var json = require("../es5/json")
string.implement("decode", function(){
	return json.parse(this)
})/*:*/

module.exports = string
