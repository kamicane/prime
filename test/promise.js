"use strict"

var promise = require("../util/promise.js")

exports.fulfilled = function(value){
    var deferred = promise()
    deferred.fulfill(value)
    return deferred.promise
};

exports.rejected = function(reason){
    var deferred = promise()
    deferred.reject(reason)
    return deferred.promise
};

exports.pending = promise
