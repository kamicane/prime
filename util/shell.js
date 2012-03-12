/*
shell
*/

var slice = Array.prototype.slice,
	create = Object.create || function(self){
	var F = function(){}
	F.prototype = self
	return new F
}

module.exports = function(base){

	var shell = create(base),
		proto = base.prototype || {},
		prototype = shell.prototype = create(proto)

	var extend = shell.extend = function(key, fn){
		if (typeof key !== 'string') for (var k in key) extend(k, key[k])
		else if (fn) shell[key] = shell[key] || fn
		return shell
	}

	var implement = shell.implement = function(key, fn){
		if (typeof key !== 'string') for (var k in key) implement(k, key[k])
		else if (fn){
			prototype[key] = prototype[key] || fn
			shell.extend(key, function(){
				var args = slice.call(arguments)
				return pro.apply(args.shift(), args)
			})
		}
		return shell
	}
	
	//=shell.install
	if (base !== Object) shell.install = function(){
		for (var key in prototype) if (!proto[key]) proto[key] = prototype[key]
		return shell
	}//.

	return shell

}
