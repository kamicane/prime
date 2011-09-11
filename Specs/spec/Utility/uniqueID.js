
define(['Base/Utility/uniqueID'], function(uniqueID){
	
	describe('uniqueID', function(){

		it('should be a string', function(){
			expect(typeof uniqueID()).toBe('string');
		});

		it("should generate unique ids", function(){
			expect(uniqueID()).not.toEqual(uniqueID());
		});
	
	});

});