
define(['Base/Utility/Array'], function(Array){

	"use strict";

	// disabled (what happened to Array.pair?)
	xdescribe('Array.pair', function(){

		it('should pair an array with the results of a method invokation', function(){
			expect([1, 2, 3, 4].pair(function(value){
				return value * 2;
			})).toEqual({
				1: 2,
				2: 4,
				3: 6,
				4: 8
			});
		});

	});

	// disabled (what happened to Array.clean?)
	xdescribe('Array.clean', function(){

		it('should clean an array from undefined and null values', function(){
			var array = [null, 1, 0, true, false, "foo", undefined];
			var arr = array.clean();
			expect(arr).toEqual([1, 0, true, false, "foo"]);
		});

	});
	
	// disabled (what happened to Array.pick?)
	xdescribe('Array.pick', function(){

		it('should pick a value that is not null from the array', function(){
			expect([null, undefined, true, 1].pick()).toEqual(true);
		});

		it('should return null', function(){
			expect([].pick()).toBeNull();
		});

	});

	describe('Array.invoke', function(){

		it('should invoke methods on the contained objects', function(){

			var item = function(i){
				this.i = i;
				this.myMethod = function(){
					return this.i;
				};
			};

			expect(Array.invoke([new item(3), new item(1), new item(2)], 'myMethod')).toEqual([3, 1, 2]);

		});

	});

	describe('Array.append', function(){

		it('should append to an array', function(){
			var a = [1,2,4];
			var b = [2,3,4,5];
			Array.append(a, b);
			expect(a).toEqual([1,2,4,2,3,4,5]);
			expect(b).toEqual([2,3,4,5]);
		});

	});

	describe('Array.contains', function(){

		it('should return true if the array contains the specified item', function(){
			expect(Array.contains([1,2,3,0,0,0], 0)).toBeTruthy();
		});

		it('should return false if the array does not contain the specified item', function(){
			expect(Array.contains([0,1,2], 'not found')).toBeFalsy();
		});

	});

	describe('Array.last', function(){

		it('should return the last item in the array', function(){
			expect(Array.last([1,2,3,0,0,0])).toEqual(0);
			expect(Array.last([3])).toEqual(3);
		});

		it('should return null if there are no items', function(){
			expect(Array.last([])).toEqual(null);
		});

	});

	describe('Array.random', function(){

		it('should get a random element from an array', function(){
			var a = [1];

			expect(Array.random(a)).toEqual(1);

			a.push(2, 3);

			// Let's try a few times
			expect(a).toContain(Array.random(a));
			expect(a).toContain(Array.random(a));
			expect(a).toContain(Array.random(a));
			expect(a).toContain(Array.random(a));
		});

	});

	describe('Array.include', function(){

		it('should include only new items', function(){
			var arr = Array.include(Array.include([1,2,3,4], 1), 5);
			expect(arr).toEqual([1,2,3,4,5]);
		});

	});

	// disabled (what happened to Array.combine?)
	xdescribe('Array.combine', function(){

		it('should combine an array', function(){
			var arr = [1,2,3,4].combine([3,1,4,5,6,7]);
			expect(arr).toEqual([1,2,3,4,5,6,7]);
		});

	});

	describe('Array.erase', function(){

		it('should remove all items in the array that match the specified item', function(){
			var arr = Array.erase([1,2,3,0,0,0], 0);
			expect(arr).toEqual([1,2,3]);
		});

	});

	// disabled (what happened to Array.empty?)
	xdescribe('Array.empty', function(){

		it('should empty the array', function(){
			var array = [1,2,3,4].empty();
			expect(array).toEqual([]);
		});

	});

	// disabled (what happened to Array.empty?)
	xdescribe('Array.flatten', function(){

		it('should flatten a multidimensional array', function(){
			var array = [1,2,3,[4,5,[6,7,[8]]], [[[[[9]]]]]];
			expect(array.flatten()).toEqual([1,2,3,4,5,6,7,8,9]);
		});

		it('should flatten arguments', function(){
			var test = function(){
				return Array.flatten(arguments);
			};
			expect(test(1,2,3)).toEqual([1,2,3]);
			expect(test([1,2,3])).toEqual([1,2,3]);
			expect(test(1,2,[3])).toEqual([1,2,3]);
		});

	});

	describe('Array.item', function(){

		it('should return the correct value', function(){
			var array = [1, 2, 3];

			expect(Array.item(array, 0)).toEqual(1);
			expect(Array.item(array, 1)).toEqual(2);
			expect(Array.item(array, 2)).toEqual(3);
			expect(Array.item(array, 3)).toEqual(null);
			expect(Array.item(array, -1)).toEqual(3);
			expect(Array.item(array, -2)).toEqual(2);
			expect(Array.item(array, -3)).toEqual(null);
		});
	});

});