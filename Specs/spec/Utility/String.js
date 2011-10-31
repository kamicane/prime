
define(['Base/Utility/String'], function(String){

	"use strict";

	// disabled (What happpened to String.test?)
	xdescribe('String.test', function(){

		it('should return true if the test matches the string otherwise false', function(){
			expect('i like teh cookies'.test('cookies')).toBeTruthy();
			expect('i like cookies'.test('ke coo')).toBeTruthy();
			expect('I LIKE COOKIES'.test('cookie', 'i')).toBeTruthy();
			expect('i like cookies'.test('cookiez')).toBeFalsy();
		});

		it('should return true if the regular expression test matches the string otherwise false', function(){
			expect('i like cookies'.test(/like/)).toBeTruthy();
			expect('i like cookies'.test(/^l/)).toBeFalsy();
		});

	});

	describe('String.contains', function(){

		it('should return true if the string contains a string otherwise false', function(){
			expect(String.contains('i like cookies', 'cookies')).toBeTruthy();
			expect(String.contains('i,like,cookies', 'cookies')).toBeTruthy();
			expect(String.contains('mootools', 'inefficient javascript')).toBeFalsy();
		});

		it('should return true if the string constains the string and separator otherwise false', function(){
			expect(String.contains('i like cookies', 'cookies', ' ')).toBeTruthy();
			expect(String.contains('i like cookies', 'cookies', ',')).toBeFalsy();

			expect(String.contains('i,like,cookies', 'cookies', ' ')).toBeFalsy();
			expect(String.contains('i,like,cookies', 'cookies', ',')).toBeTruthy();
		});

		it('should return true if the returned value of the toString method contains the string', function(){
			expect(String.contains([1,2,3], ',2,')).toBeTruthy();
		});

	});

	describe('String.clean', function(){

		it('should clean all extraneous whitespace from the string', function(){
			expect(String.clean('  i     like    cookies   ')).toEqual("i like cookies");
			expect(String.clean('  i\nlike \n cookies \n\t  ')).toEqual("i like cookies");
		});

		it('should return the cleaned value of the returned value of the toString method', function(){
			expect(String.clean({
				toString: function(){ return '  i\nlike \n cookies \n\t  '; }
			})).toEqual('i like cookies');
		});

	});

	describe('String.camelCase', function(){

		it('should convert a hyphenated string into a camel cased string', function(){
			expect(String.camelCase('i-like-cookies')).toEqual('iLikeCookies');
			expect(String.camelCase('I-Like-Cookies')).toEqual('ILikeCookies');
		});

	});

	describe('String.hyphenate', function(){

		it('should convert a camel cased string into a hyphenated string', function(){
			expect(String.hyphenate('iLikeCookies')).toEqual('i-like-cookies');
			expect(String.hyphenate('ILikeCookies')).toEqual('-i-like-cookies');
		});

	});

	describe('String.capitalize', function(){

		it('should capitalize each word', function(){
			expect(String.capitalize('i like cookies')).toEqual('I Like Cookies');
			expect(String.capitalize('I Like cOOKIES')).toEqual('I Like COOKIES');
		});

	});

	// disabled (What happened to String.escapeRegExp?)
	xdescribe('String.escapeRegExp', function(){

		it('should escape special regex characters', function(){
			expect('.*'.escapeRegExp()).toEqual('\\\.\\\*');
		});

	});

	// disabled (What happened to String.substitute?)
	xdescribe('String.substitute', function(){

		it('should substitute values from objects', function(){
			expect('This is {color}.'.substitute({'color': 'blue'})).toEqual('This is blue.');
			expect('This is {color} and {size}.'.substitute({'color': 'blue', 'size': 'small'})).toEqual('This is blue and small.');
		});

		it('should substitute values from arrays', function(){
			expect('This is {0}.'.substitute(['blue'])).toEqual('This is blue.');
			expect('This is {0} and {1}.'.substitute(['blue', 'small'])).toEqual('This is blue and small.');
		});

		it('should remove undefined values', function(){
			expect('Checking {0}, {1}, {2}, {3} and {4}.'.substitute([1, 0, undefined, null])).toEqual('Checking 1, 0, ,  and .');
			expect('This is {not-set}.'.substitute({})).toEqual('This is .');
		});

		it('should ignore escaped placeholders', function(){
			expect('Ignore \\{this} but not {that}.'.substitute({'that': 'the others'})).toEqual('Ignore {this} but not the others.');
		});

		it('should substitute with a custom regex', function(){
			var php = (/\$([\w-]+)/g);
			expect('I feel so $language.'.substitute({'language': 'PHP'}, php)).toEqual('I feel so PHP.');
			var ror = (/#\{([^}]+)\}/g);
			expect('I feel so #{language}.'.substitute({'language': 'RoR'}, ror)).toEqual('I feel so RoR.');
		});

		it('should substitute without goofing up nested curly braces', function(){
			expect("fred {is {not} very} cool".substitute({ 'is {not':'BROKEN' })).not.toEqual("fred BROKEN very} cool");
			expect('this {should {break} mo} betta'.substitute({ 'break':'work' })).toEqual('this {should work mo} betta');
		});

	});

	// disabled (What happened to String.toInt)
	xdescribe('String.toInt', function(){

		it('should convert the string into an integer', function(){
			expect('10'.toInt()).toEqual(10);
			expect('10px'.toInt()).toEqual(10);
			expect('10.10em'.toInt()).toEqual(10);
		});

		it('should convert the string into an integer with a specific base', function(){
			expect('10'.toInt(5)).toEqual(5);
		});

	});

	// disabled (What happened to String.toFloat)
	xdescribe('String.toFloat', function(){

		it('should convert the string into a float', function(){
			expect('10.11'.toFloat()).toEqual(10.11);
			expect('10.55px'.toFloat()).toEqual(10.55);
		});

	});

});
