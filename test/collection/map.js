"use strict"

var expect = require('expect.js')
var Map = require('../../collection/map')

describe('map', function(){

	var map  = new Map()
	var one = 1
	var obj = {}
	var fn = function(){}

	it('Adds values to a map instance', function(){
		expect(map.length).to.equal(0)
		map.set('foo', 'bar')
		expect(map.count()).to.equal(1)
		map.set(one, 'one')
		map.set(fn, 'function')
		map.set(obj, 'an object')
		expect(map.get('foo')).to.equal('bar')
		expect(map.get(one)).to.equal('one')
		expect(map.get(fn)).to.equal('function')
		expect(map.get(obj)).to.equal('an object')
		expect(map.count()).to.equal(4)
	})

	it('Iterates over a map instance', function(){
		var keys = []
		var values = []
		map.each(function(val, key){
			keys.push(key)
			values.push(val)
		})
		expect(keys).to.eql(['foo', one, fn, obj])
		expect(values).to.eql(['bar', 'one', 'function', 'an object'])
	})

	it('maps over the map', function(){
		var newMap = map.map(function(val, key, _map){
			expect(_map).to.be(map)
			return (key == 1) ? 'uno' : val
		})
		expect(newMap.count()).to.equal(4)
		expect(newMap.get(1, 'uno'))
	})

	it('filters the map', function(){
		var newMap = map.filter(function(val, key, _map){
			expect(_map).to.be(map)
			return typeof key === 'function'
		})
		expect(newMap.count()).to.equal(1)
	})

	it('should return false for every', function(){
		expect(map.every(function(val, key, _map){
			expect(_map).to.be(map)
			return typeof key === 'function'
		})).to.be(false)
	})

	it('should return true for some', function(){
		expect(map.some(function(val, key, _map){
			expect(_map).to.be(map)
			return typeof key === 'function'
		})).to.be(true)
	})

	it('should return the index of a value', function(){
		expect(map.index('one')).to.be(1)
		expect(map.index('non existent')).to.be(null)
	})

	it('should return the keys of the map', function(){
		var keys = map.keys()
		expect(keys).to.eql(['foo', one, fn, obj])
		expect(map.keys).not.to.be(keys)
	})

	it('should return the values of the map', function(){
		var values = map.values()
		expect(values).to.eql(['bar', 'one', 'function', 'an object'])
		expect(map.values).not.to.be(values)
	})

	it('should removes values from a map instance', function(){
		expect(map.count()).to.equal(4)
		map.remove('foo')
		expect(map.count()).to.equal(3)
		map.remove(one)
		map.remove(fn)
		map.remove(obj)
		expect(map.get('foo')).to.equal(null)
		expect(map.get(one)).to.equal(null)
		expect(map.get(fn)).to.equal(null)
		expect(map.get(obj)).to.equal(null)
		expect(map.count()).to.equal(0)
	})

	it("should return [object Map] when toString'ed", function(){
		expect(String(map)).to.equal('[object Map]')
	})

})
