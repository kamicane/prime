/*
Date shell
*/

var date = require("../util/shell")(Date)

//=es5,date.now
date.extend('now', function(){
	return +(new Date)
})//.

module.exports = date
