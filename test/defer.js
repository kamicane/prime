"use strict";

var expect = require('expect.js')
var defer = require('../defer')

describe('defer', function(){

    it('should be able to cancel with return function', function(done){

        var cancel = defer(function(){
            throw new Error('this is not working');
        });

        cancel();
        cancel(); // should not affect anything

        setTimeout(function() {
            done();
        }, 10);

    })

    it('should keep the order of multiple defer calls', function(done){
        var array = []

        var deferIt = function(index){
            defer(function(){
                array.push(index)
            })
        }

        var magicNumber = 37

        for (var i = 0; i < magicNumber; i++) deferIt(i)

        defer(function(){
            var expected = [];
            for (var i = 0; i < magicNumber; i++) expected.push(i)
            expect(array).to.eql(expected)
            done()
        })

    })

    it('should allow deferring immediately with a context', function(done){
        var object = {}

        defer.immediate(function(){
            expect(this).to.be(object)
            done()
        }, object)

    })

    it('should allow deferring with a timeout, batching those', function(done){
        var object = {}

        var now1, now2, now3

        var l = 0
        var dones = function(){
            if (++l === 3){
                expect(now1).to.be(now2)
                expect(now3).to.not.be(now1)

                done()
            }
        }

        defer(function(time){
            now1 = time
            expect(this).to.be(object)
            dones()
        }, 16, object)

        defer.timeout(function(time){
            now2 = time
            expect(this).to.be(object)
            dones()
        }, 16, object)


        setTimeout(function(){

            defer.timeout(function(time){
                now3 = time
                expect(this).to.be(object)
                dones()
            }, 16, object)

        }, 4)

    })

    it('should allow deferring on animation frame', function(done){
        var object = {}

        var now1, now2, now3

        var l = 0
        var dones = function(){
            if (++l === 3){
                expect(now1).to.be(now2)
                expect(now3).to.be(now2)
                done()
            }
        }

        defer.frame(function(time){
            now1 = time
            expect(this).to.be(object)
            dones()
        }, object)

        defer.frame(function(time){
            now2 = time
            expect(this).to.be(object)
            dones()
        }, object)


        setTimeout(function(){

            defer.frame(function(time){
                now3 = time
                expect(this).to.be(object)
                dones()
            }, object)

        }, 4)

    })


})

