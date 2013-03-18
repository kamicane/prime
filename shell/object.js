/*
object
 - object shell
*/"use strict"

var prime  = require("../index"),
    object = require("../es5/object")

// set, get, count, each, map, filter, every, some, index, merge, remove, keys, values

object.implementGenerics({

    set: function(self, key, value){
        self[key] = value
        return self
    },

    get: function(self, key){
        var value = self[key]
        return value != null ? value : null
    },

    count: function(self){
        var length = 0
        prime.each(self, function(){
            length++
        })
        return length
    },

    each: function(self, method, context){
        return prime.each(self, method, context)
    },

    map: function(self, method, context){
        var results = {}
        prime.each(self, function(value, key, self){
            results[key] = method.call(context, value, key, self)
        })
        return results
    },

    filter: function(self, method, context){
        var results = {}
        prime.each(self, function(value, key, self){
            if (method.call(context, value, key, self)) results[key] = value
        })
        return results
    },

    every: function(self, method, context){
        var every = true
        prime.each(self, function(value, key, self){
            if (!method.call(context, value, key, self)) return every = false
        })
        return every
    },

    some: function(self, method, context){
        var some = false
        prime.each(self, function(value, key, self){
            if (!some && method.call(context, value, key, self)) return !(some = true)
        })
        return some
    },

    index: function(self, value){
        var key = null
        prime.each(self, function(match, k){
            if (value === match){
                key = k
                return false
            }
        })
        return key
    },

    remove: function(self, key){
        var value = self[key]
        delete self[key]
        return value
    },

    keys: function(self){
        var keys = []
        prime.each(self, function(value, key){
            keys.push(key)
        })
        return keys
    },

    values: function(self){
        var values = []
        prime.each(self, function(value, key){
            values.push(value)
        })
        return values
    }

})

object.each = prime.each

if (typeof JSON !== 'undefined') object.implement({encode: function(){
    return JSON.stringify(this)
}})

module.exports = object
