
define(['Base/Accessor'], function(Accessor){

	"use strict";

	describe('Accessor', function(){

		it('should define accessor methods', function(){
			var accessor = new Accessor;

			accessor.define('key', 'value');
			expect(accessor.lookup('key')).toEqual('value');

			accessor.defines({
				b: 2,
				c: 3
			});
			expect(accessor.lookup('b')).toEqual(2);
			expect(accessor.lookups('b', 'key')).toEqual({
				b: 2,
				key: 'value'
			});

			var list = {};
			accessor.each(function(value, key){
				list[key] = value;
			});

			expect(list).toEqual({
				key: 'value',
				b: 2,
				c: 3
			});
		});

		it('should define named accessors', function(){
			var CandyStore = new Accessor('Item');
			var Candy = function(){};

			var jello = new Candy;
			var skittles = new Candy;
			CandyStore.defineItem('jello', jello);
			CandyStore.defineItems({
				skittles: skittles,
				snickers: new Candy
			});

			expect(CandyStore.lookupItem('jello')).toBe(jello);
			expect(CandyStore.lookupItems('skittles', 'jello')).toEqual({
				skittles: skittles,
				jello: jello
			});

			this.addMatchers({
				toBeInstanceof: function(instance) { return this.actual instanceof instance; }
			});

			var items = 0;
			CandyStore.eachItem(function(candy){
				expect(candy).toBeInstanceof(Candy);
				items++;
			});
			expect(items).toEqual(3);
		});

		it('should inherit values from another Accessor', function(){
			var first = Accessor();
			first.define('chocolate', 'bar');

			var second = first();

			expect(second.lookup('chocolate')).toEqual('bar');
			second.define('mars', 'murrie');

			expect(second.lookup('mars')).toEqual('murrie');
			expect(first.lookup('mars')).toBeNull();
		});

		it('should define/lookup regexp keys', function(){
			var accessor = Accessor('Matcher');

			var value, name;
			accessor.defineMatcher(/^protected\s(\w+)$/, function(_0, _1){
				value = _0;
				name = _1;
			});
			var fn = accessor.lookupMatcher('protected method');
			fn('value');
			expect(value).toEqual('value');
			expect(name).toEqual('method');

			accessor.defineMatcher(/\d+/, 'number');
			expect(accessor.lookupMatcher('3')).toEqual('number');

		});

	});

});
