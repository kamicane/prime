/*
Date pod
*/

module.exports = require("./")(Date).extend('now', function(){
	return +(new Date)
})
