
define(['Base/Utility/Function'], function(Function){

	describe('Function.overloadSetter', function(){

		var collector, setter;
		beforeEach(function(){
			collector = {};
			setter = (function(key, value){
				collector[key] = value;
			});
		});

		it('should call a specific setter', function(){
			setter = Function.overloadSetter(setter);
			setter('key', 'value');

			expect(collector).toEqual({key: 'value'});

			setter({
				otherKey: 1,
				property: 2
			});

			expect(collector).toEqual({
				key: 'value',
				otherKey: 1,
				property: 2
			});

			setter({
				key: 3
			});
			setter('otherKey', 4);

			expect(collector).toEqual({
				key: 3,
				otherKey: 4,
				property: 2
			});
		});

		it('should only works with objects in plural mode', function(){
			setter = Function.overloadSetter(setter, true);

			setter({
				a: 'b',
				c: 'd'
			});

			expect(collector).toEqual({
				a: 'b',
				c: 'd'
			});
		});

	});

	describe('Function.overloadGetter', function(){

		var object, getter;
		beforeEach(function(){
			object = {
				a: 1,
				b: 2,
				c: 3
			};

			getter = (function(key){
				return object[key] || null;
			});
		});

		it('should call a getter for each argument', function(){
			getter = Function.overloadGetter(getter);

			expect(getter('a')).toEqual(1);
			expect(getter('b')).toEqual(2);
			expect(getter('c')).toEqual(3);
			expect(getter('d')).toBeNull();

			expect(getter('a', 'b', 'c')).toEqual(object);
			expect(getter(['a', 'b', 'c'])).toEqual(object);
			expect(getter(['a', 'c', 'd'])).toEqual({a: 1, c: 3, d: null});
		});

		it('should work in plural mode', function(){
			getter = Function.overloadGetter(getter, true);

			expect(getter('a')).toEqual({
				a: 1
			});
		
			expect(getter(['a', 'b'])).toEqual({
				a: 1,
				b: 2
			});
		})

	});

	describe('Function.from', function(){

		it('if a function is passed in that function should be returned', function(){
			var fn = function(a,b){ return a; };
			expect(Function.from(fn)).toEqual(fn);
		});
	
		it('should return a function that returns the value passed when called', function(){
			expect(Function.from('hello world!')()).toEqual('hello world!');
		});

	});
	
	describe('Function.attempt', function(){

		it('should return the result of the first successful function without executing successive functions', function(){
			var calls = 0;
			var attempt = Function.attempt(function(){
				calls++;
				throw new Exception();
			}, function(){
				calls++;
				return 'success';
			}, function(){
				calls++;
				return 'moo';
			});
			expect(calls).toEqual(2);
			expect(attempt).toEqual('success');
		});

		it('should return null when no function succeeded', function(){
			var calls = 0;
			var attempt = Function.attempt(function(){
				calls++;
				return I_invented_this();
			}, function(){
				calls++;
				return uninstall_ie();
			});
			expect(calls).toEqual(2);
			expect(attempt).toBeNull();
		});

		it('should call the function without raising an exception', function(){
			var fnc = function(){
				throw 'up';
			};
			Function.attempt(fnc);
		});

		it("should return the function's return value", function(){
			var spy = jasmine.createSpy().andReturn('hello world!');
			expect(Function.attempt(spy)).toEqual('hello world!');
		});

		it('should return null if the function raises an exception', function(){
			var fnc = function(){
				throw 'up';
			};
			expect(Function.attempt(fnc)).toBeNull();
		});

	});

	// disabled (what happened to Function.pass?)
	xdescribe('Function.pass', function(){

		it('should return a function that when called passes the specified arguments to the original function', function(){
			var spy = jasmine.createSpy().andReturn('the result');
			var fnc = spy.pass('an argument');
			expect(spy).not.toHaveBeenCalled();
			expect(fnc('additional', 'arguments')).toBe('the result');
			expect(spy).toHaveBeenCalledWith('an argument', 'additional', 'arguments');
			expect(spy.callCount).toBe(1);
		});

		it('should pass multiple arguments and bind the function to a specific object when it is called', function(){
			var spy = jasmine.createSpy().andReturn('the result');
			var binding = {some: 'binding'};
			var fnc = spy.pass(['multiple', 'arguments'], binding);
			expect(spy).not.toHaveBeenCalled();
			expect(fnc('additional', 'arguments')).toBe('the result');
			expect(spy.mostRecentCall.object).toEqual(binding);
			expect(spy).toHaveBeenCalledWith('multiple', 'arguments', 'additional', 'arguments');
		});

	});

	// disabled (what happened to Function.extend?)
	xdescribe('Function.extend', function(){

		it("should extend the function's properties", function(){
			var fnc = (function(){}).extend({a: 1, b: 'c'});
			expect(fnc.a).toEqual(1);
			expect(fnc.b).toEqual('c');
		});

	});

	// disabled (what happened to Function.delay?)
	xdescribe('Function.delay', function(){
	
		beforeEach(function(){
			this.clock = sinon.useFakeTimers();
		});
	
		afterEach(function(){
			this.clock.reset();
			this.clock.restore();
		});

		it('should return a timer pointer', function(){
			var spyA = jasmine.createSpy('Alice');
			var spyB = jasmine.createSpy('Bob');

			var timerA = spyA.delay(200);
			var timerB = spyB.delay(200);

			this.clock.tick(100);

			expect(spyA).not.toHaveBeenCalled();
			expect(spyB).not.toHaveBeenCalled();
			clearTimeout(timerB);

			this.clock.tick(250);

			expect(spyA.callCount).toBe(1);
			expect(spyB.callCount).toBe(0);
		});

		it('should pass parameter 0', function(){
			var spy = jasmine.createSpy();
			spy.delay(50, null, 0);
			this.clock.tick(100);

			expect(spy).toHaveBeenCalledWith(0);
		});

		it('should not pass any argument when no arguments passed', function(){
			var argumentCount = null;
			var spy = function(){
				argumentCount = arguments.length;
			}
			spy.delay(50);

			this.clock.tick(100);

			expect(argumentCount).toEqual(0);
		});

	});

	// disabled (What happened to Function.periodical?)
	xdescribe('Function.periodical', function(){
	
		beforeEach(function(){
			this.clock = sinon.useFakeTimers();
		});
	
		afterEach(function(){
			this.clock.reset();
			this.clock.restore();
		});
	
		it('should return an interval pointer', function(){
			var spy = jasmine.createSpy('Bond');

			var interval = spy.periodical(10);
			expect(spy).not.toHaveBeenCalled();

			this.clock.tick(100);

			expect(spy.callCount).toBeGreaterThan(2);
			expect(spy.callCount).toBeLessThan(15);
			clearInterval(interval);
			spy.reset();
			expect(spy).not.toHaveBeenCalled();

			this.clock.tick(100);

			expect(spy).not.toHaveBeenCalled();
		});

		it('should pass parameter 0', function(){
			var spy = jasmine.createSpy();
			var timer = spy.periodical(10, null, 0);

			this.clock.tick(100);

			expect(spy).toHaveBeenCalledWith(0);
			clearInterval(timer);
		});

		it('should not pass any argument when no arguments passed', function(){
			var argumentCount = null;
			var spy = function(){
				argumentCount = arguments.length;
			}
			var timer = spy.periodical(50);

			this.clock.tick(100);

			expect(argumentCount).toEqual(0);
			clearInterval(timer);
		});

	});


});
