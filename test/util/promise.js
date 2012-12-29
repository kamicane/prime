"use strict"

var promise = require("../../util/promise.js")

exports.fulfilled = function(value){
    var deferred = promise()
    deferred.accept(value)
    return deferred.promise
}

exports.rejected = function(reason){
    var deferred = promise()
    deferred.reject(reason)
    return deferred.promise
}

exports.pending = function(){
    var deferred = promise()

    return {
        promise: deferred.promise,
        fulfill: function(value){ return deferred.accept(value) },
        reject: function(reason){ deferred.reject(reason) }
    }
}
