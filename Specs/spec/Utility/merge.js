
define(['Base/Utility/merge'], function(merge){

	describe('merge', function(){

		it('should merge any object inside the passed in object, and should return the passed in object', function(){
			var a = {a:1, b:2, c: {a:1, b:2, c:3}};
			var b = {c: {d:4}, d:4};
			var c = {a: 5, c: {a:5}};

			var merger = merge(a, b);

			expect(merger).toEqual({a:1, b:2, c:{a:1, b:2, c:3, d:4}, d:4});
			expect(merger === a).toBeTruthy();

			expect(merge(a, b, c)).toEqual({a:5, b:2, c:{a:5, b:2, c:3, d:4}, d:4});
		});

		// Doesn't clone sub-arrays anymore?
		xit('should recursively clone sub objects and sub-arrays', function(){
			var a = {a:1, b:2, c: {a:1, b:2, c:3}, d: [1,2,3]};
			var b = {e: {a:1}, f: [1,2,3]};

			var merger = merge(a, b);

			expect(a.e === b.e).toBeFalsy();
			expect(a.f === b.f).toBeFalsy();
		});

	});

});
