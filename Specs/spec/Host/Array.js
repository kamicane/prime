
define(['Base/Host/Array'], function(Array_){

	describe('Array.isArray', function(){

		it('should test if an value is an Array', function(){
			expect(Array_.isArray([])).toBe(true);
			expect(Array_.isArray(new Array())).toBe(true);
			expect(Array_.isArray(Array())).toBe(true);
			expect(Array_.isArray('abc'.match(/(a)*/g))).toBe(true);
			expect((function(){ return Array_.isArray(arguments); })()).toBe(false);
			expect(Array_.isArray()).toBe(false);
			expect(Array_.isArray(null)).toBe(false);
			expect(Array_.isArray(undefined)).toBe(false);
			expect(Array_.isArray(true)).toBe(false);
			expect(Array_.isArray(false)).toBe(false);
			expect(Array_.isArray('a string')).toBe(false);
			expect(Array_.isArray({})).toBe(false);
			expect(Array_.isArray({length: 5})).toBe(false);
			expect(Array_.isArray({__proto__: Array.prototype, length:1, 0:1, 1:2})).toBe(false);
		});

	});

	describe('Array.forEach', function(){

		it('should call the function for each item in Function arguments', function(){
			var daysArr = [];
			(function(){
				Array_.forEach(arguments, function(value, key){
					daysArr[key] = value;
				});
			})('Sun','Mon','Tue');

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should call the function for each item in the array', function(){
			var daysArr = [];
			Array_.forEach(['Sun','Mon','Tue'], function(value, i){
				daysArr.push(value);
			});

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should not iterate over deleted elements', function(){
			var array = [0, 1, 2, 3],
				testArray = [];
			delete array[1];
			delete array[2];

			Array_.forEach(array, function(value){
				testArray.push(value);
			});

			expect(testArray).toEqual([0, 3]);
		});

	});
	
	function getTestArray(){		
		var array = [0, 1, 2, 3];
		delete array[1];
		delete array[2];
		return array;
	}
	
	function isNumber(value){
		return typeof value == 'number';
	}

	describe('Array.filter', function(){

		it('should filter an array', function(){
			var array = [1,2,3,0,0,0];
			var arr = Array_.filter(array.concat([false, null, 4]), isNumber);
			expect(arr).toEqual(array.concat(4));
		});

		it('filter should skip deleted elements', function(){
			var i = 0;
			
			Array_.filter(getTestArray(), function(){
				i++;
				return true;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.indexOf', function(){

		it('should return the index of the item', function(){
			expect(Array_.indexOf([1,2,3,0,0,0], 0)).toEqual(3);
		});

		it('should return -1 if the item is not found in the array', function(){
			expect(Array_.indexOf([1,2,3,0,0,0], 'not found')).toEqual(-1);
		});

	});

	describe('Array.map', function(){

		it('should return a mapping of an array', function(){
			var arr = Array_.map([1,2,3,0,0,0], function(item){
				return (item + 1);
			});

			expect(arr).toEqual([2,3,4,1,1,1]);
		});

		it('should skip deleted elements', function(){
			var i = 0;
			Array_.map(getTestArray(), function(){
				return i++;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.every', function(){

		it('should return true if every item matches the comparator, otherwise false', function(){
			expect(Array_.every([1,2,3,0,0,0], isNumber)).toBeTruthy();

			expect(Array_.every(['1',2,3,0], isNumber)).toBeFalsy();
		});

		it('should skip deleted elements', function(){
			var i = 0;
			Array_.every(getTestArray(), function(){
				i++;
				return true;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.some', function(){

		it('should return true if some of the items in the array match the comparator, otherwise false', function(){
			expect(Array_.some(['1',2,3,0], isNumber)).toBeTruthy();

			var array = Array_.map([1,2,3,0,0,0], String);
			expect(Array_.some(array, isNumber)).toBeFalsy();
		});

		it('should skip deleted elements', function(){
			var i = 0;
			var a = getTestArray();
			delete a[0];

			// skips the first three elements
			Array_.some(a, function(value, index){
				i = index;
				return true;
			});

			expect(i).toEqual(3);
		});

	});


});
