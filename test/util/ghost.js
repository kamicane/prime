
"use strict";

var expect = require('expect.js')
var ghost = require('../../util/ghost')()

var type = require('../../util/type'),
	array = require('../../es5/array'),
	number = require('../../es5/number'),
	string = require('../../es5/string')

describe('ghost', function(){

	ghost.register(function(self){
		return type(self) == 'array'
	}, array)

	ghost.register(function(self){
		return type(self) == 'string'
	}, string)

	it('should ghost types for chaining methods', function(){
		expect(ghost([1, 2, 3]).join().valueOf()).to.equal('1,2,3')
		expect(ghost('  1,A,F   ').trim().split(',').map(function(value){
			return parseInt(value, 16)
		}).valueOf()).to.eql([1, 10, 15])
	})

	it('should return a string when ghost.toString() is called', function(){
		expect(ghost('foo').split('').toString()).to.equal('f,o,o')
	})

	it('should use ghost.is() to test if the value of the ghost is a value', function(){
		expect(ghost('ping').is('random')).not.to.be.ok()
		expect(ghost('ping').is('ping')).to.be.ok()
	})

})

