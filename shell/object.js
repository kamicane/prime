/*
object
 - object shell
*/"use strict"

var prime = require("../prime/"),
    shell = require("../shell/")

// set, get, count, each, map, filter, every, some, index, merge, remove, keys, values

var object = shell({

    inherits: require("../es5/object"),

    set: function(key, value){
        this[key] = value
        return this
    },

    get: function(key){
        var value = this[key]
        return value != null ? value : null
    },

    count: function(){
        var length = 0
        prime.each(this, function(){
            length++
        })
        return length
    },

    each: function(method, context){
        return prime.each(this, method, context)
    },

    map: function(method, context){
        var results = {}
        prime.each(this, function(value, key, self){
            results[key] = method.call(context, value, key, self)
        })
        return results
    },

    filter: function(method, context){
        var results = {}
        prime.each(this, function(value, key, self){
            if (method.call(context, value, key, self)) results[key] = value
        })
        return results
    },

    every: function(method, context){
        var every = true
        prime.each(this, function(value, key, self){
            if (!method.call(context, value, key, self)) return every = false
        })
        return every
    },

    some: function(method, context){
        var some = false
        prime.each(this, function(value, key, self){
            if (!some && method.call(context, value, key, self)) return !(some = true)
        })
        return some
    },

    index: function(value){
        var key = null
        prime.each(this, function(match, k){
            if (value === match){
                key = k
                return false
            }
        })
        return key
    },

    remove: function(key){
        var value = this[key]
        delete this[key]
        return value
    },

    keys: function(){
        var keys = []
        prime.each(this, function(value, key){
            keys.push(key)
        })
        return keys
    },

    values: function(){
        var values = []
        prime.each(this, function(value, key){
            values.push(value)
        })
        return values
    }

})

object.each = prime.each

/*(hash.encode)?*/
if (typeof JSON !== 'undefined') object.implement({encode: function(){
    return JSON.stringify(this)
}})/*:*/

module.exports = object
