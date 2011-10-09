
define(['Base/Core'], function(Core){

	describe('Core', function(){

		var toString = Object.prototype.toString;
		beforeEach(function(){
			this.addMatchers({
				toBeString: function() { return toString.call(this.actual) == '[object String]'; }
			});
		});

		it('should have a version', function(){
			expect(Core.version).toBeString();
		});

		it('should have a build hash', function(){
			expect(Core.build).toBeString();
		});

	});
});
