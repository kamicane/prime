"use strict";

var expect = require('expect.js')
var emitter = require('../emitter')

describe('emitter', function(){

    it('should keep the order on multiple async emits', function(done){
        var publisher = new emitter(), called = 0

        var magicNumber = 37

        var array = []

        var emitIt = function(index) {
            publisher.emit('publish', index)
        }

        for (var i = 0; i < magicNumber; i++) emitIt(i)

        publisher.on('publish', function(index){
            array.push(index)
            if (++called === magicNumber){
                var expected = [];
                for (var i = 0; i < magicNumber; i++) expected.push(i)
                expect(array).to.eql(expected)
                done()
            }
        })

    })

    it('should allow subscriptions with on, async emit', function(done){
        var publisher = new emitter(), called = 0
        publisher.on('publish', function(){
            called++
            done()
        })
        expect(called).to.be(0)
        publisher.emit('publish')
    })

    it('should allow unsubscriptions with off, async emit', function(done){
        var publisher = new emitter()

        publisher.on('publish', done)
        publisher.off('publish', done)
        publisher.on('publish', done)

        publisher.emit('publish')
    })

    it('should not add the same listener twice', function(done){
        var events = new emitter(), called = 0
        var listener = function(){ done() }
        events.on('thing', listener)
        events.on('thing', listener)
        events.emit('thing')
    })

    it('should not remove listeners of a different type', function(done){
        var events = new emitter(), calledA = 0, calledB = 0

        var doneA = function(){
            calledA++

            if (calledB === 2 && calledA === 2) done()
        }

        var doneB = function(){
            calledB++
            if (calledB === 2 && calledA === 2) done()
        }

        events.on('thing', doneA)
        events.on('thang', doneB)
        events.emit('thing')
        events.emit('thang')

        events.off('thing', doneB)

        events.emit('thing')
        events.emit('thang')
    })

})

