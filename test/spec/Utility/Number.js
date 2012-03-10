
define(['Base/Utility/Number', 'Base/Utility/Object'], function(Number, Object){

	"use strict";

	describe('Number.random', function(){

		it('should return a random number', function(){
			expect(Number.random(1, 1)).toEqual(1);

			// Let's try a few times
			var a = [1, 2, 3];
			expect(a).toContain(Number.random(1, 3));
			expect(a).toContain(Number.random(1, 3));
			expect(a).toContain(Number.random(1, 3));
			expect(a).toContain(Number.random(1, 3));
		});

	});

	describe('Number.limit', function(){

		it('should limit a number within a range', function(){
			expect(Number.limit(-1, 0, 1)).toEqual(0);
			expect(Number.limit(3, 1, 2)).toEqual(2);
		});

		it('should not limit a number if within the range', function(){
			expect(Number.limit(2, 0,4)).toEqual(2);
		});

	});

	describe('Number.round', function(){

		it('should round a number to the nearest whole number if units place is not specified', function(){
			expect(Number.round(0.01)).toEqual(0);
		});

		it('should round a number according the units place specified', function(){
			expect(Number.round(0.01, 2)).toEqual(0.01);
			expect(Number.round(1, 3)).toEqual(1);
			expect(Number.round(-1.01)).toEqual(-1);
			expect(Number.round(-1.01, 2)).toEqual(-1.01);
			expect(Number.round(111, -1)).toEqual(110);
			expect(Number.round(-111, -2)).toEqual(-100);
			expect(Number.round(100, -5)).toEqual(0);
		});

	});

	describe('Number.times', function(){

		it('should call the function for the specified number of times', function(){
			var found = 0;
			Number.times(3, function(i){
				found = i;
			});

			var found2 = -1;
			Number.times(0, function(i){
				found2 = i;
			});

			expect(found).toEqual(2);
			expect(found2).toEqual(-1);
		});

		it('should bind and call the function for the specified number of times', function(){
			var aTest = 'hi';
			var found3 = false;
			Number.times(1, function(i){
				found3 = (this == aTest);
			}, aTest);
			expect(found3).toBeTruthy();
		});

	});

	// disabled (What happened to Number.toInt?)
	xdescribe('Number.toInt', function(){

		it('should convert a number to an integer', function(){
			expect((111).toInt()).toEqual(111);
		});

		it('should convert a number depending on the radix provided', function(){
			expect((111).toInt(2)).toEqual(7);
			expect((0x16).toInt(10)).toEqual(22); //ECMA standard, radix is optional so if starts with 0x then parsed as hexadecimal
			//expect((016).toInt(10)).toEqual(14); //ECMA standard, radix is optional so if starts with 0 then parsed as octal
		});

	});

	// disabled (What happened to Number.toFloat?)
	xdescribe('Number.toFloat', function(){

		it('should convert a number to a float', function(){
			expect((1.00).toFloat()).toEqual(1);
			expect((1.12 - 0.12).toFloat()).toEqual(1);
			expect((0.0010).toFloat()).toEqual(0.001);
			expect((Number.MIN_VALUE).toFloat()).toEqual(Number.MIN_VALUE);
		});

	});

	describe('Number Math methods', function(){
		Object.forEach({
			abs: { test: [-1], title: 'absolute' },
			acos: { test: [0], title: 'arc cosine' },
			asin: { test: [0.5], title: 'arc sine' },
			atan: { test: [0.5], title: 'arc tangent' },
			atan2: { test: [0.1, 0.5], title: 'arc tangent' },
			ceil: { test: [0.6], title: 'number closest to and not less than the' },
			cos: { test: [30], title: 'cosine' },
			exp: { test: [2], title: 'exponent' },
			floor: { test: [2.4], title: 'integer closet to and not greater than' },
			log: { test: [2], title: 'log' },
			max: { test: [5, 3], title: 'maximum' },
			min: { test: [-4, 2], title: 'minimum' },
			pow: { test: [2, 2], title: 'power' },
			sin: { test: [0.5], title: 'sine' },
			sqrt: { test: [4], title: 'square root' },
			tan: { test: [0.3], title: 'tangent' }
		}, function(value, key){
			var b = value.test[1];
			it('should return the ' + value.title + ' value of the number' + ((b) ? ' and the passed number' : ''), function(){
				expect(Number[key](value.test[0], b)).toEqual(Math[key].apply(null, value.test));
			});
		});
	});

});
