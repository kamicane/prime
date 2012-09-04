"use strict";

var expect = require('expect.js')
var emitter = require('../../util/emitter')

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
			called+=5
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
})

