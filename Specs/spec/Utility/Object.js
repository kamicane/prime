
define(['Base/Utility/Object'], function(Object){

	describe('Object.isEnumerable', function(){

		it('isEnumerable method on Type should return true for arrays, arguments, objects with a numerical length property', function(){
			expect(Object.isEnumerable([1, 2, 3])).toBeTruthy();
			(function(){
				expect(Object.isEnumerable(arguments)).toBeTruthy();
			})(1, 2, 3);
			expect(Object.isEnumerable({length: 2})).toBeTruthy();
		});

	});

	describe('Object.forEach', function(){

		it('should call the function for each item in the object', function(){
			var daysObj = {};
			Object.forEach({first: "Sunday", second: "Monday", third: "Tuesday"}, function(value, key){
				daysObj[key] = value;
			});

			expect(daysObj).toEqual({first: 'Sunday', second: 'Monday', third: 'Tuesday'});
		});

		it('should ignore the prototype chain', function(){
			var fn = function(){};
			fn.prototype = {a: 1};

			var object = new fn;
			object.b = 2;

			var items = {};
			Object.forEach(object, function(value, key){
				items[key] = value;
			});

			expect(items).toEqual({b: 2});
		});

	});

	describe('Object.getLength', function(){

		it('should get the amount of items in an object', function(){
			var object = {
				a: [0, 1, 2],
				s: "It's-me-Valerio!",
				n: 1,
				f: 3.14,
				b: false
			};

			expect(Object.getLength(object)).toEqual(5);

			object.n = null;

			expect(Object.getLength(object)).toEqual(5);
		});

	});

	// disabled (What happened to Object.from?)
	xdescribe('Object.from', function(){

		it('should create an object from keys and values', function(){
			expect(Object.from(
				['a', 'b'],
				[1, 2]
			)).toEqual({
				a: 1,
				b: 2
			});
		});
	
		it('should fill values with null if keys are overspecified', function(){
			expect(Object.from(
				[1, 2, 3],
				['a', 'b']
			)).toEqual({
				'1': 'a',
				'2': 'b',
				'3': null
			});
		});

		it('should ignore overspecified values', function(){
			expect(Object.from(
				['a', 'b'],
				[1, 2, 3]
			)).toEqual({
				a: 1,
				b: 2
			});
		});

	});

	describe('Object.append', function(){

		it('should combine two objects', function(){
			var a = {a: 1, b: 2}, b = {b: 3, c: 4};
			expect(Object.append(a, b)).toEqual({a: 1, b: 3, c: 4});

			a = {a: 1, b: 2}; b = {b: 3, c: 4};
			expect(Object.append(a, b)).toEqual(a);

			a = {a: 1, b: 2}; b = {b: 3, c: 4};
			var c = {a: 2, d: 5};
			expect(Object.append(a, b, c)).toEqual({a: 2, b: 3, c: 4, d: 5});
		});

	});

	var object = {a: 'string', b: 233, c: {}};

	describe('Object.subset', function(){

		it('should return an object with only the specified keys', function(){
			expect(Object.subset(object, ['a', 'b'])).toEqual({a: 'string', b:233});
		});

		it('should fill values with null for empty objects', function(){
			expect(Object.subset({a: 1}, ['a', 'b'])).toEqual({
				a: 1,
				b: null
			});
		});

	});

	describe('Object.map', function(){

		it('should map a new object according to the comparator', function(){
			expect(Object.map(object, function(value){
				return typeof value == 'number';
			})).toEqual({
				a: false,
				b: true,
				c: false
			});
		});

	});

	describe('Object.filter', function(){

		it('should filter the object according to the comparator', function(){
			expect(Object.filter(object, function(value){
				return typeof value == 'number';
			})).toEqual({b:233});
		});

	});

	describe('Object.every', function(){

		it('should return true if every value matches the comparator, otherwise false', function(){
			expect(Object.every(object, function(){
				return true;
			})).toEqual(true);
			expect(Object.every(object, function(value){
				return typeof value == 'number';
			})).toEqual(false);
		});

	});

	describe('Object.some', function(){

		it('should return true if some of the values match the comparator, otherwise false', function(){
			expect(Object.some(object, function(value){
				return typeof value == 'number';
			})).toBeTruthy();
			expect(Object.some(object, function(value){
				return value.push;
			})).toBeFalsy();
		});

	});

	describe('Object.values', function(){

		it('values should return an empty array', function(){
			expect(Object.values({})).toEqual([]);
		});

		it('should return an array with the values of the object', function(){
			expect(Object.values(object)).toEqual(['string', 233, {}]);
		});

	});

	describe('Object.keyOf', function(){

		it('should return the key of the value or null if not found', function(){
			expect(Object.keyOf(object, 'string')).toEqual('a');
			expect(Object.keyOf(object, 'not found')).toBeNull();
		});

	});

	describe('Object.contains', function(){

		it('should return true if the object contains value otherwise false', function(){
			expect(Object.contains(object, 'string')).toBeTruthy();
			expect(Object.contains(object, 'not found')).toBeFalsy();
		});

	});

});