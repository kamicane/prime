
define(['Base/Host/Number'], function(Number){

	"use strict";

	describe('Number', function(){

		it('should have implemented the ECMAScript methods', function(){
			expect(Number.toExponential(1000)).toEqual('1e+3');
		});

	});

});
