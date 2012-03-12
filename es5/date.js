/*
Date shell
*/

var date = require("../util/shell")(Date)

//=date.now
date.extend('now', function(){
	return +(new Date)
})//.

module.exports = date
