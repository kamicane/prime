/*
promise
 - code based on https://github.com/ForbesLindesay/promises-a MIT Licensed
*/"use strict"

var prime = require("../prime/index")

var defer = (global.process && process.nextTick) || function(callback){
    setTimeout(callback, 0)
}

// states of the promise

var states = {PENDING: 0, FULFILLED: 1, FAILED: 2}

// promise() returns a new deferred
// the deferred object can be either rejected or accepted
// if the deferred is rejected, the promise is failed
// if the deferred is accepted, the promise is fulfilled
// the promise is accessed with the .promise property of the deferred object
// the promise is an object with a method called .then

var deferred = function deferred(){

    if (!(this instanceof deferred)) return new deferred()

    var state = states.PENDING,
        stack = [],
        value

    var next = function(delayed){
        if (stack.length) stack.shift()(delayed)
    }

    var resolve = function(st, val){
        state = st
        value = val
        next()
    }

    var accept = this.accept = function(val){
        if (!state){
            // if the promise gets fulfilled with another promise
            // p1.accept(promise) === promise.then(p1.accept, p1.reject)
            if (val && typeof val.then === "function") val.then(accept, reject)
            else resolve(states.FULFILLED, val)
        }
        return this
    }

    var reject = this.reject = function(reason){
        if (!state) resolve(states.FAILED, reason)
        return this
    }

    var promise = function promise(){}

    var then = this.then = promise.prototype.then = function(success, err){ // then always returns a new promise
        var deferred = new deferred()

        var done = function(delayed){ // this function gets pushed in the waiting stack

            var callback = (state === states.FULFILLED) ? success : err

            if (typeof callback === "function"){ // if there is a function callback

                var exec = function(){
                    try { // fulfill the new promise with the result of the success callback
                        deferred.accept(callback(value))
                    } catch (err){ // unless the success callback throws an error, in which case reject it with the error
                        deferred.reject(err)
                    }
                    // next then. we are certain that we are in a delayed state here, so force it to not defer again
                    next(true)
                }

                delayed ? exec() : defer(exec) // if we're not already in a delayed state, defer the fulfillment / rejection

            } else if (state === states.FULFILLED){
                // if no callback is found and the promise is fulfilled, fulfill the new promise with the current promise's value
                deferred.accept(value)
                // next then, defer only when not in a delayed state
                next(delayed)
            } else {
                // if no callback is found and the promise is either failed or pending, reject the new promise with the current promise's value
                deferred.reject(value)
                // next then, defer only when not in a delayed state
                next(delayed)
            }
        }

        stack.push(done)
        // if the promise has a state, proceed to the next then
        if (state) next()

        return deferred.promise
    }

    this.promise = new promise

}

module.exports = prime({constructor: deferred})
