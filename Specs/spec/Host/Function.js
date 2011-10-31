
define(['Base/Host/Function'], function(Function){

	"use strict";

	describe('Function.bind', function(){

		it('should return the function bound to an object', function(){
			var spy = jasmine.createSpy();
			var f = Function.bind(spy, 'MooTools');
			expect(spy).not.toHaveBeenCalled();
			f();
			expect(spy).toHaveBeenCalledWith();
			f('foo', 'bar');
			expect(spy).toHaveBeenCalledWith('foo', 'bar');
		});
		
		it('should return the function bound to an object with specified argument', function(){
			var binding = {some: 'binding'};
			var spy = jasmine.createSpy().andReturn('something');
			var f = Function.bind(spy, binding, 'arg');

			expect(spy).not.toHaveBeenCalled();
			expect(f('additional', 'arguments')).toEqual('something');
			expect(spy).toHaveBeenCalledWith('arg', 'additional', 'arguments');
			expect(spy.mostRecentCall.object).toEqual(binding);
		});

		it('should return the function bound to an object with multiple arguments', function(){
			var binding = {some: 'binding'};
			var spy = jasmine.createSpy().andReturn('something');
			var f = Function.bind(spy, binding, 'foo', 'bar');

			expect(spy).not.toHaveBeenCalled();
			expect(f('additional', 'arguments')).toEqual('something');
			expect(spy).toHaveBeenCalledWith('foo', 'bar', 'additional', 'arguments');
			expect(spy.mostRecentCall.object).toEqual(binding);
		});


	});

});
