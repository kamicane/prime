/*
String pod
*/

module.exports = require("./")(String).implement('trim', function(){
	return (this + '').replace(/^\s+|\s+$/g, '')
})
