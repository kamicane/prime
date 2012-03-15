/*
Shell
*/

var create = require("../util/create"),
	slice = Array.prototype.slice

var Shell = function(){}

var implement = Shell.implement = function(key, method){
	if (typeof key !== 'string') for (var k in key) implement.call(this, k, key[k])
	else if (method){
		this.prototype[key] = method
		this[key] = function(self){
			var args = (arguments.length > 1) ? slice.call(arguments, 1) : []
			return method.apply(self, args)
		}
	}
	return this
}

module.exports = function(base){
	var shell = create(base || (base = Shell))
	shell.prototype = create(base.prototype)

	return shell
}
