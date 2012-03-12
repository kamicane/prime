/*
String shell
*/

var string = require("../util/shell")(String)

string.implement('trim', /*(es5 && string.trim)?*/function(){
	return (this + '').replace(/^\s+|\s+$/g, '')
}/*:null*/)

module.exports = string
