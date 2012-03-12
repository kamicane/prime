/*
String shell
*/

var string = require("../shell")(String)

//=string.trim
string.implement('trim', function(){
	return (this + '').replace(/^\s+|\s+$/g, '')
})//.

module.exports = string
