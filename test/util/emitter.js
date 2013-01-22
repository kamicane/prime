"use strict";

var expect = require('expect.js')
var emitter = require('../../emitter')

describe('emitter', function(){

    it('should allow subscriptions with on', function(){
        var publisher = new emitter(), called = 0
        publisher.on('publish', function(){
            called++
        })
        expect(called).to.be(0)
        publisher.emit('publish')
        expect(called).to.be(1)
    })

    it('should allow unsubscription with off', function(){
        var publisher = new emitter(), called = 0
        var changeIdea = function(){
            called++
        }
        publisher.on('publish', function(){
            called++
        })
        publisher.on('publish', changeIdea)
        expect(called).to.be(0)
        publisher.emit('publish')
        expect(called).to.be(2)
        publisher.off('publish', changeIdea)
        publisher.emit('publish')
        expect(called).to.be(3)
    })

    it('should publish with emit', function(){
        var publisher = new emitter(), called = 0
        publisher.on('add1', function(){
            called++
        })
        publisher.on('subtract1', function(){
            called--
        })
        publisher.on('add5', function(){
            called += 5
        })
        expect(called).to.be(0)
        publisher.emit('add5')
        expect(called).to.be(5)
        publisher.emit('foo')
        expect(called).to.be(5)
        publisher.emit('subtract1')
        expect(called).to.be(4)
        publisher.emit('add1')
        expect(called).to.be(5)
    })

    it('should remove all listeners', function(){
        var events = new emitter(), called = 0
        var listener = function(){
            called++
        }
        events.on('thing', listener)
        events.off('thing', listener)
        events.emit('thing')
        expect(called).to.be(0)
    })

    it('should not add the same listener twice', function(){
        var events = new emitter(), called = 0
        var listener = function(){ called++ }
        events.on('thing', listener)
        events.on('thing', listener)
        events.emit('thing')
        expect(called).to.be(1)
    })

    it('should not remove listeners of a different type', function(){
        var events = new emitter(), calledA = 0, calledB = 0
        var listenerA = function(){ calledA++ }
        var listenerB = function(){ calledB++ }
        events.on('thing', listenerA)
        events.on('thang', listenerB)
        events.emit('thing')
        events.emit('thang')
        expect(calledA).to.be(1)
        expect(calledB).to.be(1)

        events.off('thing', listenerA)

        events.emit('thing')
        events.emit('thang')
        expect(calledA).to.be(1)
        expect(calledB).to.be(2)
    })

})

