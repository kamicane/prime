
define(['Base/Host/Date'], function(Date){
	
	describe('Date.now', function(){

		it('should return a timestamp', function(){
			expect(typeof Date.now() == 'number').toBeTruthy();
		});

	});

});