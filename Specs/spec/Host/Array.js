
define(['Base/Host/Array', 'Base/Utility/typeOf'], function(Array, typeOf){
	
	describe('Array.forEach', function(){

		// disabled since Array.from does not exist
		xit('should call the function for each item in Function arguments', function(){
			var daysArr = [];
			(function(){
				Array.forEach(Array.from(arguments), function(value, key){
					daysArr[key] = value;
				});
			})('Sun','Mon','Tue');

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should call the function for each item in the array', function(){
			var daysArr = [];
			Array.forEach(['Sun','Mon','Tue'], function(value, i){
				daysArr.push(value);
			});

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should not iterate over deleted elements', function(){
			var array = [0, 1, 2, 3],
				testArray = [];
			delete array[1];
			delete array[2];

			Array.forEach(array, function(value){
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
		return typeOf(value) == 'number';
	}

	describe('Array.filter', function(){

		it('should filter an array', function(){
			var array = [1,2,3,0,0,0];
			var arr = Array.filter(array.concat([false, null, 4]), isNumber);
			expect(arr).toEqual(array.concat(4));
		});

		it('filter should skip deleted elements', function(){
			var i = 0;
			
			Array.filter(getTestArray(), function(){
				i++;
				return true;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.indexOf', function(){

		it('should return the index of the item', function(){
			expect(Array.indexOf([1,2,3,0,0,0], 0)).toEqual(3);
		});

		it('should return -1 if the item is not found in the array', function(){
			expect(Array.indexOf([1,2,3,0,0,0], 'not found')).toEqual(-1);
		});

	});

	describe('Array.map', function(){

		it('should return a mapping of an array', function(){
			var arr = Array.map([1,2,3,0,0,0], function(item){
				return (item + 1);
			});

			expect(arr).toEqual([2,3,4,1,1,1]);
		});

		it('should skip deleted elements', function(){
			var i = 0;
			Array.map(getTestArray(), function(){
				return i++;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.every', function(){

		it('should return true if every item matches the comparator, otherwise false', function(){
			expect(Array.every([1,2,3,0,0,0], isNumber)).toBeTruthy();

			expect(Array.every(['1',2,3,0], isNumber)).toBeFalsy();
		});

		it('should skip deleted elements', function(){
			var i = 0;
			Array.every(getTestArray(), function(){
				i++;
				return true;
			});

			expect(i).toEqual(2);
		});

	});

	describe('Array.some', function(){

		it('should return true if some of the items in the array match the comparator, otherwise false', function(){
			expect(Array.some(['1',2,3,0], isNumber)).toBeTruthy();

			var array = Array.map([1,2,3,0,0,0], String);
			expect(Array.some(array, isNumber)).toBeFalsy();
		});

		it('should skip deleted elements', function(){
			var i = 0;
			var a = getTestArray();
			delete a[0];

			// skips the first three elements
			Array.some(a, function(value, index){
				i = index;
				return true;
			});

			expect(i).toEqual(3);
		});

	});


});
