
define(['Base/Core'], function(Core){

	describe('Core', function(){

		var toString = Object.prototype.toString;
		// https://github.com/isaacs/node-semver/blob/master/semver.js#L6-10
		var semver = "\\s*[v=]*\\s*([0-9]+)"  // major
			+ "\\.([0-9]+)"                   // minor
			+ "\\.([0-9]+)"                   // patch
			+ "(-[0-9]+-?)?"                  // build
			+ "([a-zA-Z-][a-zA-Z0-9-\.:]*)?"; // tag
		var semverRe = new RegExp("^\\s*" + semver + "\\s*$");
		beforeEach(function(){
			this.addMatchers({
				toBeString: function(){
					return toString.call(this.actual) == '[object String]';
				},
				toMatchSemver: function(){
					return this.actual.match(semverRe);
				}
			});
		});

		it('should have a version', function(){
			expect(Core.version).toBeString();
		});

		it('s version should match as a semver version', function(){
			expect(Core.version).toMatchSemver();
		});

		it('should have a build hash', function(){
			expect(Core.build).toBeString();
		});

	});
});
