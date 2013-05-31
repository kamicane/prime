"use strict"

var expect = require('expect.js')
var fn = require('../../function')

describe('function', function(){

    it('should implement .apply', function(){
        var context = {}
        fn.apply(function(a, b){
            expect(this).to.be(context)
            expect(a).to.be(1)
            expect(b).to.be(2)
        }, context, [1, 2])
    })

    it('should implement .call', function(){
        var context = {}
        fn.call(function(a, b){
            expect(this).to.be(context)
            expect(a).to.be(1)
            expect(b).to.be(2)
        }, context, 1, 2)
    })

    /*
    it('should implement .bind', function(){
        var context = {}, calls = 0
        var fun = function(){
            expect(this).to.be(context)
            calls++
        }
        var bound = fn.bind(fun, context)
        bound()
        expect(calls).to.be(1)
    })
    */

    // TODO implement all other .bind tests

})

