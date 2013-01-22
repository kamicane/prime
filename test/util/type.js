"use strict"

var expect = require('expect.js')
var type = require('../../type')

describe('type', function(){

    it("should return 'array' for Array objects", function(){
        expect(type([1, 2])).to.equal('array')
    })

    it("should return 'string' for String objects", function(){
        expect(type('ciao')).to.equal('string')
    })

    it("should return 'regexp' for RegExp objects", function(){
        expect(type(/_/)).to.equal('regexp')
    })

    it("should return 'function' for Function objects", function(){
        expect(type(function(){})).to.equal('function')
    })

    it("should return 'number' for Number objects", function(){
        expect(type(10)).to.equal('number')
        expect(type(Infinity)).to.equal('number')
    })

    it("should return 'null' for NaN", function(){
        expect(type(NaN)).to.equal('null')
    })

    it("should return 'boolean' for Boolean objects", function(){
        expect(type(true)).to.equal('boolean')
        expect(type(false)).to.equal('boolean')
    })

    it("should return 'object' for objects", function(){
        expect(type({a: 2})).to.equal('object')
        expect(type(arguments)).to.equal('object')
    })

    it("should return 'null' for null objects", function(){
        expect(type(null)).to.equal('null')
    })

    it("should return 'null' for undefined objects", function(){
        expect(type(undefined)).to.equal('null')
    })

})
