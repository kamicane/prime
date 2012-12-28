/*
promise
 - code based on https://github.com/ForbesLindesay/promises-a MIT Licensed
*/"use strict"

var defer = (global.process && process.nextTick) || function(callback){
    setTimeout(callback, 0)
}

var states = {PENDING: 0, FULFILLED: 1, REJECTED: 2}

var promise = function(){

    var self    = {},
        waiting = [],
        state   = states.PENDING,
        value

    // var pub = {then: then}

    var resolve = function(st, val){
        state = st
        value = val
        next()
    }

    var next = function(deferred){
        if (waiting.length) waiting.shift()(deferred)
    }

    var fulfill = self.fulfill = function(val){
        if (!state){

            // if the promise gets fulfilled with another promise
            // p1.fulfill(promise) === promise.then(p1.fulfill, p1.reject)

            if (val && typeof val.then === 'function') val.then(fulfill, reject)
            else resolve(states.FULFILLED, val)
        }

        return this
    }

    var reject = self.reject = function(reason){
        if (!state) resolve(states.REJECTED, reason)
        return this
    }

    var then = self.then = function(success, err){ // then always returns a new promise
        var p = promise()

        var done = function(deferred){ // this function gets pushed in the waiting stack

            var callback = (state === states.FULFILLED) ? success : err

            if (typeof callback === "function"){ // if there is a function callback

                var exec = function(){
                    try { // fulfill the new promise with the result of the success callback
                        p.fulfill(callback(value))
                    } catch (err){ // unless the success callback throws an error, in which case reject it with the error
                        p.reject(err)
                    }
                    // next then. we are certain that we are in a deferred state here, so force it to not defer again
                    next(true)
                }

                deferred ? exec() : defer(exec) // if we're not already in a deferred state, defer the fulfillment / rejection

            } else if (state === states.FULFILLED){
                // if no callback is found and the promise is fulfilled, fulfill the new promise with the current promise's value
                p.fulfill(value)

                // next then, defer only when not in a deferred state
                next(deferred)
            } else {
                // if no callback is found and the promise is either rejected or pending, reject the new promise with the current promise's value
                p.reject(value)

                // next then, defer only when not in a deferred state
                next(deferred)
            }
        }

        waiting.push(done)

        // if the promise has a state, proceed to the next then
        if (state) next()

        return p.promise
    }

    self.promise = {then: then}

    return self
}

module.exports = promise
