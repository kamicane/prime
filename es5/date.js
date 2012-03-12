/*
Date shell
*/

var date = require("../util/shell")(Date)


date.extend('now', /*(es5 && date.now)?*/function(){
	return +(new Date)
}/*:null*/)

module.exports = date
