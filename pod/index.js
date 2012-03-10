/*
Pod
*/

var slice = Array.prototype.slice,
	create = Object.create || function(self){
	var F = function(){}
	F.prototype = self
	return new F
}

module.exports = function(base){

	var pod = create(base),
		proto = base.prototype || {},
		prototype = pod.prototype = create(proto)

	var extend = pod.extend = function(key, fn){
		if (typeof key !== 'string') for (var k in key) extend(k, key[k])
		else if (fn) pod[key] = pod[key] || fn
		return pod
	}

	var implement = pod.implement = function(key, fn){
		if (typeof key !== 'string') for (var k in key) implement(k, key[k])
		else if (fn){
			prototype[key] = prototype[key] || fn
			pod.extend(key, function(){
				var args = slice.call(arguments)
				return pro.apply(args.shift(), args)
			})
		}
		return pod
	}

	pod.install = function(){
		for (var key in prototype) if (!proto[key]) proto[key] = prototype[key]
		return pod
	}

	return pod

}
