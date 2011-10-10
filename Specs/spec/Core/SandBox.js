
define(['Base/Core/SandBox'], function(SB){

	describe('Sandbox', function(){

		it('should sandbox a value where all Host methods are available', function(){
			expect(SB('  foo ').trim().split('').valueOf()).toEqual(['f', 'o', 'o']);
		});

		it('should return a string when SandBox::toString() is called', function(){
			expect(SB('foo').split('').toString()).toEqual('f,o,o');
		});

	});

});
