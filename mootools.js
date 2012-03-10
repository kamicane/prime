var mootools = {}

mootools.install = function(what){
	if (what == "es5"){
		require("./pod/array").install()
		require("./pod/string").install()
		require("./pod/object").install()
		require("./pod/number").install()
		require("./pod/regexp").install()
		require("./pod/date").install()
		require("./pod/function").install()
	}
	return mootools
}

mootools.array = require("./pod/extra/array")
mootools.string = require("./pod/extra/string")
mootools.object = require("./pod/extra/object")
mootools.number = require("./pod/extra/number")
mootools.regexp = require("./pod/extra/regexp")
mootools.date = require("./pod/date")
mootools.fn = require("./pod/extra/function")

module.exports = mootools
