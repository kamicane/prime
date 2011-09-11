
define(['Base/Host/RegExp'], function(RegExp){

	describe('RegExp', function(){
		it('should have implemented the ECMAScript methods', function(){
			expect(RegExp.test(/\w+/, 'yadayadayada')).toEqual(true);
		});
	});

});
