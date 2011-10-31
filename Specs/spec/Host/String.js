
define(['Base/Host/String'], function(String){

	"use strict";

	describe('String.trim', function(){

		it('should trim left and right whitespace from the string', function(){
			expect(String.trim('  i like cookies  ')).toEqual('i like cookies');
			expect(String.trim('  i  \tlike  cookies  ')).toEqual('i  \tlike  cookies');
		});

		it('should return the trimmed value of the returned value of the toString method', function(){
			expect(String.trim({
				toString: function(){ return '  i like cookies  '; }
			})).toEqual('i like cookies');
		});

	});

});
