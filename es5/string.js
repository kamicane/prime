/*
String shell
*/

var string = require("../util/shell")(String)

//=es5,string.trim
string.implement('trim', function(){
	return (this + '').replace(/^\s+|\s+$/g, '')
})//.

module.exports = string
