define(['Base/Host'], function(Host){

var FakeHost, reset = function(){
	FakeHost = function(){};
	FakeHost.prototype.instanceMethod = function(){};
	FakeHost.instanceMethod = function(){};
	FakeHost.staticMethod = function(){};
};

beforeEach(reset);

describe('Host', function(){

	beforeEach(reset);

	it('should return a protected (unlinked) host object', function(){
		var Host_ = Host(FakeHost);
		expect(Host_).not.toBe(FakeHost);

		Host_.prototype.random = Math.random;
		expect(FakeHost.prototype.random).toBeUndefined();

		Host_.generic = Math.random;
		expect(FakeHost.generic).toBeUndefined();
	});

	it('should provide implement, extend, and install interface', function(){
		var Host_ = Host(FakeHost);
		expect(Host_.implement).toBeDefined();
		expect(Host_.extend).toBeDefined();
		expect(Host_.install).toBeDefined();
	});

});

describe('Host.extend', function(){

	beforeEach(reset);

	it('should add a new static method to the protected host object, and not affect the host object', function(){
		var Host_ = Host(FakeHost);
		var newStaticMethod = function(){};
		Host_.extend('newStaticMethod', newStaticMethod);
		expect(Host_.newStaticMethod).toBeDefined();

		expect(FakeHost.newStaticMethod).toBeUndefined();
	});

	it('should not overwrite an existing static method', function(){
		var Host_ = Host(FakeHost);
		var staticMethod = function(){};
		Host_.extend('staticMethod', staticMethod);
		expect(Host_.staticMethod).toBeDefined();
		expect(Host_.staticMethod).toBe(FakeHost.staticMethod);
	});

	it('should accept a key/value object (setters)', function(){
		var Host_ = Host(FakeHost);
		var staticMethod = function(){}
		Host_.extend({
			staticMethod: staticMethod,
			newStaticMethod: staticMethod
		})
		expect(Host_.staticMethod).toBe(FakeHost.staticMethod);
		expect(Host_.newStaticMethod).toBeDefined();
		expect(Host_.newStaticMethod).toBe(staticMethod);

		expect(FakeHost.newStaticMethod).toBeUndefined();
	});

});

describe('Host.implement', function(){

	beforeEach(reset);

	it('should add a new instance and generic method to the protected host object, and not affect the host object', function(){
		var Host_ = Host(FakeHost);
		var newInstanceMethod = function(){};
		Host_.implement('newInstanceMethod', newInstanceMethod);
		expect(Host_.prototype.newInstanceMethod).toBeDefined();
		expect(Host_.newInstanceMethod).toBeDefined();

		expect(FakeHost.prototype.newInstanceMethod).toBeUndefined();
		expect(FakeHost.newInstanceMethod).toBeUndefined();
	});

	it('should "genericize" the instance method', function(){
		var Host_ = Host(FakeHost);
		var newInstanceMethod = function(){ return [this, arguments]; };
		Host_.implement('newInstanceMethod', newInstanceMethod);
		var results = Host.newInstanceMethod('a', 'b', 'c');
		expect(results[0]).toEqual('a');
		expect(results[1]).toEqual(['b', 'c']);

		var results = Host_.prototype.newInstanceMethod.apply('a', ['b', 'c']);
		expect(results[0]).toEqual('a');
		expect(results[1]).toEqual(['b', 'c']);
	});

	it('should not overwrite an existing instance or generic method', function(){
		var Host_ = Host(FakeHost);
		var instanceMethod = function(){};
		Host_.implement('instanceMethod', instanceMethod);
		expect(Host_.prototype.instanceMethod).toBeDefined();
		expect(Host_.prototype.instanceMethod).toBe(FakeHost.prototype.instanceMethod);
		expect(Host_.instanceMethod).toBeDefined();
		expect(Host_.instanceMethod).toBe(FakeHost.instanceMethod);
	});

	it('should accept a key/value object (setters)', function(){
		var Host_ = Host(FakeHost);
		var instanceMethod = function(){}
		Host_.implement({
			instanceMethod: instanceMethod,
			newInstanceMethod: instanceMethod
		})
		expect(Host_.instanceMethod).toBe(FakeHost.prototype.instanceMethod);
		expect(Host_.prototype.newInstanceMethod).toBeDefined();
		expect(Host_.prototype.newInstanceMethod).toBe(instanceMethod);
		expect(Host_.newInstanceMethod).toBeDefined();
		expect(Host_.newInstanceMethod).toBe(instanceMethod);

		expect(FakeHost.prototype.newInstanceMethod).toBeUndefined();
		expect(FakeHost.newInstanceMethod).toBeUndefined();
	});

});

describe('Host.install', function(){

	it('should extend the host object with the static method', function(){
		var Host_ = Host(FakeHost);
		var newStaticMethod = function(){};
		Host_.extend('newStaticMethod', newStaticMethod);
		Host_.extend('staticMethod', newStaticMethod);

		var oldStaticMethod = FakeHost.staticMethod;
		Host_.install();

		expect(FakeHost.newStaticMethod).toBe(newStaticMethod);
		expect(FakeHost.staticMethod).toBe(oldStaticMethod);
	});

	it('should extend the host object with the instance method', function(){
		var Host_ = Host(FakeHost);
		var newInstanceMethod = function(){};
		Host_.implement('newInstanceMethod', newInstanceMethod);
		Host_.implement('instanceMethod', newInstanceMethod);

		var oldInstanceMethod = FakeHost.prototype.instanceMethod;
		var oldGenericMethod = FakeHost.instanceMethod;
		Host_.install();

		expect(FakeHost.prototype.newInstanceMethod).toBe(newInstanceMethod);
		expect(FakeHost.newInstanceMethod).toBeDefined();
		expect(FakeHost.prototype.instanceMethod).toBe(oldInstanceMethod);
		expect(FakeHost.instanceMethod).toBe(oldGenericMethod);
	});

})

});
