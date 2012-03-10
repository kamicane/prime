
define(['Base/Utility/clone', 'Base/Host/Array', 'Base/Host/Object'], function(clone, Array, Object){

	"use strict";

	describe('clone', function(){

		it('should recursively clone and dereference arrays and objects, while mantaining the primitive values', function(){
			var a = [1,2,3, [1,2,3, {a: [1,2,3]}]];
			var b = Array.clone(a);
			expect(a === b).toBeFalsy();
			expect(a[3] === b[3]).toBeFalsy();
			expect(a[3][3] === b[3][3]).toBeFalsy();
			expect(a[3][3].a === b[3][3].a).toBeFalsy();

			expect(a[3]).toEqual(b[3]);
			expect(a[3][3]).toEqual(b[3][3]);
			expect(a[3][3].a).toEqual(b[3][3].a);
		});

		it('should recursively clone and dereference arrays and objects, while mantaining the primitive values', function(){
			var a = {a:[1,2,3, [1,2,3, {a: [1,2,3]}]]};
			var b = Object.clone(a);
			expect(a === b).toBeFalsy();
			expect(a.a[3] === b.a[3]).toBeFalsy();
			expect(a.a[3][3] === b.a[3][3]).toBeFalsy();
			expect(a.a[3][3].a === b.a[3][3].a).toBeFalsy();

			expect(a.a[3]).toEqual(b.a[3]);
			expect(a.a[3][3]).toEqual(b.a[3][3]);
			expect(a.a[3][3].a).toEqual(b.a[3][3].a);
		});

	});

});
