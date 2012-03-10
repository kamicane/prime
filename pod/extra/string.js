/*
String pod with custom methods
*/

var string = require("../")(require("../string"))

module.exports = string.implement({

	contains: function(string, separator){
		return ((separator) ? (separator + this + separator).indexOf(separator + string + separator) : (this + '').indexOf(string)) > -1
	},

	clean: function(){
		return string.trim((this + '').replace(/\s+/g, ' '))
	},

	camelize: function(){
		return (this + '').replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase()
		})
	},

	hyphenate: function(){
		return (this + '').replace(/[A-Z]/g, function(match){
			return '-' + match.toLowerCase()
		})
	},

	capitalize: function(){
		return (this + '').replace(/\b[a-z]/g, function(match){
			return match.toUpperCase()
		})
	}

})
