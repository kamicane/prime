/*
array
 - array shell
*/"use strict"

var array = require("../es5/array")

// set, get, count, each, map, filter, every, some, index, merge, remove, keys, values

module.exports = array.implementGenerics({

    set: function(self, i, value){
        self[i] = value
        return self
    },

    get: function(self, i){
        return (i in self) ? self[i] : null
    },

    count: function(self){
        return self.length
    },

    each: function(self, method, context){
        for (var i = 0, l = self.length; i < l; i++){
            if (i in self && method.call(context, self[i], i, self) === false) break
        }
        return self
    },

    backwards: function(self, method, context){
        for (var i = self.length - 1; i >= 0; i--){
            if (i in self && method.call(context, self[i], i, self) === false) break
        }
        return self
    },

    index: function(self, value){
        var index = array.indexOf(self, value)
        return index === -1 ? null : index
    },

    remove: function(self, i){
        return array.splice(self, i, 1)[0]
    }

})
