/*
Date shell with custom methods
*/

var date = require("../util/shell")(require("../es5/date"))

//=date.type
date.implement('type', function(){
	return "date"
})//.

module.exports = date
