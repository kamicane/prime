/*
String shell with custom methods
*/

var string = require("../util/shell")(require("../es5/string"))

//=string.decode
var json = require("../es5/json")
string.implement("decode", function(){
	return json.parse(this)
})
//.

string.implement({
	
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
	},//.
	
	//=string.toInt
	toInt: function(){
		return parseInt(this, 10)
	},//.
	
	//=string.toFloat
	toFloat: function(){
		return parseFloat(this)
	},//.
	
	//=string.type
	type: function(){
		return "string"
	}//.

})

module.exports = string
