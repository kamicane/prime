"use strict"

var expect = require('expect.js')
var throttle = require('../../function/throttle')

describe('function/throttle', function(){

    it('should only call the function once in the given interval', function(done){

        var callCount = 0
        var fn = function(){
            callCount++
        }

        var throttled = throttle(fn, 40)

        throttled()
        throttled()
        throttled()

        expect(callCount).to.be(1)

        setTimeout(function(){
            throttled()
            throttled()
        }, 20)

        setTimeout(function(){
            throttled()
            throttled()
        }, 50)

        setTimeout(function(){
            expect(callCount).to.be(2)
            done()
        }, 70)

    })

    it('should default the timeout to 100ms', function(done){

        var callCount = 0
        var fn = function(){
            callCount++
        }

        var throttled = throttle(fn, 40)

        throttled()

        setInterval(function(){
            throttled()
        }, 110)

        setInterval(function(){
            expect(callCount).to.be(2)
            done()
        }, 120)

    })

})
