"use strict";

var expect = require('expect.js')
var ghost = require("../../shell")
var array = require('../../array')
var string = require('../../string')
var prime = require('../../index')

describe('shell', function(){

    // https://github.com/visionmedia/mocha/issues/502#issuecomment-7317552
    beforeEach(function(done){
        setTimeout(done, 0)
    })

    it('should ghost types for chaining methods', function(){
        expect(ghost([1, 2, 3]).join().valueOf()).to.equal('1,2,3')
        expect(ghost('  1,A,F   ').trim().split(',').map(function(value){
            return parseInt(value, 16)
        }).valueOf()).to.eql([1, 10, 15])
    })

    it('should use valueOf automatically', function(){
        expect(ghost('abcd').indexOf('c').is(2)).to.be.ok()
        expect(ghost('abcd').indexOf('c') + 1).to.equal(3)
    })

    it('should return a string when ghost.toString() is called', function(){
        expect(ghost('foo').split('').toString()).to.equal('f,o,o')
    })

    it('should use ghost.is() to test if the value of the ghost is a value', function(){
        expect(ghost('ping').is('random')).not.to.be.ok()
        expect(ghost('ping').is('ping')).to.be.ok()
    })

    it('should add new methods to the base object when a method is implemented in the ghost', function(){
        string.implement({
            cat: function(b){
                return this + b
            }
        })
        expect(string.cat('first', 'second')).to.be('firstsecond')
    })

    it('should allow typecasting', function(){
        (function(){
            expect(array(arguments).join().valueOf()).to.equal('1,2,3,4')
        })(1,2,3,4)
    })

})
