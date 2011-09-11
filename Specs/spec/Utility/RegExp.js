
define(['Base/Utility/RegExp'], function(RegExp_){

	describe('RegExp.escape', function(){
		var match = RegExp_.escape("[k'et(ch)u\\p]+\w");
		expect(new RegExp(match).test("I like lots of [k'et(ch)u\\p]+\w")).toBeTruthy();
	});

});
