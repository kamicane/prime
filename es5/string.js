/*
String shell
*/

var string = require("../util/ghost").string

/*(es5 && string.trim)?*/
if (!string.trim) string.implement('trim', function(){
	return (this + '').replace(/^\s+|\s+$/g, '')
})/*:*/

module.exports = string
