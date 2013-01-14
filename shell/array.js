/*
array
 - array shell
*/"use strict"

var array = require("../es5/array")

// set, get, count, each, map, filter, every, some, index, merge, remove, keys, values

module.exports = array.implement({

    set: function(i, value){
        this[i] = value
        return this
    },

    get: function(i){
        return (i in this) ? this[i] : null
    },

    count: function(){
        return this.length
    },

    each: function(method, context){
        for (var i = 0, l = this.length; i < l; i++){
            if (i in this && method.call(context, this[i], i, this) === false) break
        }
        return this
    },

    backwards: function(method, context){
        for (var i = this.length - 1; i >= 0; i--){
            if (i in this && method.call(context, this[i], i, this) === false) break
        }
        return this
    },

    index: function(value){
        var index = array.indexOf(this, value)
        return index === -1 ? null : index
    },

    remove: function(i){
        return array.splice(this, i, 1)[0]
    }

})
