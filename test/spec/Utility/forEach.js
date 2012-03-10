
define(['Base/Utility/forEach'], function(forEach){

	"use strict";

	describe('forEach', function(){

		it('should call the function for each item in the object', function(){
			var daysObj = {};
			forEach({first: "Sunday", second: "Monday", third: "Tuesday"}, function(value, key){
				daysObj[key] = value;
			});

			expect(daysObj).toEqual({first: 'Sunday', second: 'Monday', third: 'Tuesday'});
		});

		it('should call the function for each item in Function arguments', function(){
			var daysArr = [];
			(function(){
				forEach([].slice.call(arguments), function(value, key){
					daysArr[key] = value;
				});
			})('Sun','Mon','Tue');

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should call the function for each item in the array', function(){
			var daysArr = [];
			forEach(['Sun','Mon','Tue'], function(value, i){
				daysArr.push(value);
			});

			expect(daysArr).toEqual(['Sun','Mon','Tue']);
		});

		it('should not iterate over deleted elements', function(){
			var array = [0, 1, 2, 3],
				testArray = [];
			delete array[1];
			delete array[2];

			forEach(array, function(value){
				testArray.push(value);
			});

			expect(testArray).toEqual([0, 3]);
		});

		it('should iterate over numbers', function(){
			var keys = [];
			forEach(3, function(i){
				context = this;
				keys.push(i);
			}, 'moo');
			expect(context).toEqual('moo');
			expect(keys).toEqual([0, 1, 2]);
		});

	});

});
