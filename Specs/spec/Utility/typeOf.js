
define(['Base/Utility/typeOf'], function(typeOf){

	describe('typeOf', function(){

		it("should return 'array' for Array objects", function(){
			expect(typeOf([1,2])).toEqual('array');
		});

		it("should return 'string' for String objects", function(){
			expect(typeOf('ciao')).toEqual('string');
		});

		it("should return 'regexp' for RegExp objects", function(){
			expect(typeOf(/_/)).toEqual('regexp');
		});

		it("should return 'function' for Function objects", function(){
			expect(typeOf(function(){})).toEqual('function');
		});

		it("should return 'number' for Number objects", function(){
			expect(typeOf(10)).toEqual('number');
			expect(typeOf(NaN)).not.toEqual('number');
		});

		it("should return 'boolean' for Boolean objects", function(){
			expect(typeOf(true)).toEqual('boolean');
			expect(typeOf(false)).toEqual('boolean');
		});

		it("should return 'object' for Object objects", function(){
			expect(typeOf({a:2})).toEqual('object');
		});

		// disabled due to use of window.opera (requires Browser.js, which is not ready)
		xit("should return 'arguments' for Function arguments", function(){
			
			if (typeof window != 'undefined' && window.opera){ // Seems like the Opera guys can't decide on this
				var type = $type(arguments);
				expect(type == 'array' || type == 'arguments').toBeTruthy();
				return;
			}
		
			expect(typeOf(arguments)).toEqual('arguments');
		});

		it("should return 'null' for null objects", function(){
			expect(typeOf(null)).toEqual('null');
		});

		it("should return 'null' for undefined objects", function(){
			expect(typeOf(undefined)).toEqual('null');
		});

	});

});
