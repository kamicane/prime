
define(['Base/Host/Object'], function(Object){

	describe('Object.create', function(){

		it('create should create a new object with a specified prototype', function(){
			var method = function(){};

			var f = function(){};
			f.prototype.foo = method;
			var k = function(){};

			k.prototype = Object.create(f.prototype);
			var instance = new k;

			expect(k.prototype.foo).toEqual(method);
			expect(instance.foo).toEqual(method);
		});

	});

	describe('Object.keys', function(){

		it('keys should return an empty array', function(){
			expect(Object.keys({})).toEqual([]);
		});

		it('should return an array containing the keys of the object', function(){
			expect(Object.keys({a: 1, b: 'foo', c: function(){}})).toEqual(['a', 'b', 'c']);
		});

	});

});
