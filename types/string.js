/*
String shell with custom methods
*/

var string = require("../util/shell")(require("../string"))

module.exports = string.implement({
	
	//=string.contains
	contains: function(string, separator){
		return ((separator) ? (separator + this + separator).indexOf(separator + string + separator) : (this + '').indexOf(string)) > -1
	},//.
	
	//=string.clean
	clean: function(){
		return string.trim((this + '').replace(/\s+/g, ' '))
	},//.
	
	//=string.camelize
	camelize: function(){
		return (this + '').replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase()
		})
	},//.
	
	//=string.hyphenate
	hyphenate: function(){
		return (this + '').replace(/[A-Z]/g, function(match){
			return '-' + match.toLowerCase()
		})
	},//.
	
	//=string.capitalize
	capitalize: function(){
		return (this + '').replace(/\b[a-z]/g, function(match){
			return match.toUpperCase()
		})
	}//.

})
