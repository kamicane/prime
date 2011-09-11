/*
---
name: Sandbox
description: simple Sandbox
...
*/

define([
	'../Utility/typeOf', '../Host/Array', '../Host/Date', '../Host/Function', '../Host/Number', '../Host/Object', '../Host/RegExp', '../Host/String'
], function(typeOf, A, D, F, N, O, R, S){
	
var hosts = {ARRAY: A, DATE: D, FUNCTION: F, NUMBER: N, OBJECT: O, REGEXP: R, STRING: S},
	sandboxes = {};

for (var h in hosts) (function(host, h){

	var hostImplement = host.implement, sandbox = sandboxes[h] = function(o){
		this.self = o;
	};

	sandbox.implement = function(key, method){
		if (method) this.prototype[key] = function(){
			return sb(method.apply(this.self, arguments), this);
		};
	};

	for (var p in host.prototype) sandbox.implement(p, host.prototype[p]);

	var implement = host.implement = function(key, fn){
		if (typeof key != 'string') for (var k in key) implement.call(this, k, key[k]); else {
			hostImplement.call(this, key, fn);
			if (this.prototype[key]) sandbox.implement(key, fn);
		}
		return this;
	};

	sandbox.prototype.valueOf = function(){
		return this.self.valueOf();
	};
	
	sandbox.prototype.toString = function(){
		return this.self.toString();
	};

})(hosts[h], h);

var sb = function(item){
	if (item == null) return null;
	item = item.valueOf();
	var type = typeOf(item).toUpperCase(), sandbox = sandboxes[type];
	return sandbox ? new sandbox(item) : item;
};

return sb;
	
});
