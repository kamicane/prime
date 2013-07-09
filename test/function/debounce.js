"use strict"

var expect = require("expect.js")
var debounce = require("../../function/debounce")

describe('function/debounce', function(){

    it('should only call the function after the function is not called for a while', function(done){

        var callCount = 0
        var fn = function(){
            callCount++
        }

        var debounced = debounce(fn, 10)

        debounced()
        debounced()

        expect(callCount).to.be(0)

        setTimeout(function(){
            debounced()
        }, 5)

        setTimeout(function(){
            expect(callCount).to.be(1)
            done()
        }, 20)

    })

})
