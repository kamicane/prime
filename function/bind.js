/*
function:bind
*/"use strict"

var slice = Array.prototype.slice

var bind = function(self, context){
    if (arguments.length < 3) return function(){
        return self.apply(context, arguments)
    }
    var args = slice.call(arguments, 2)
    return function(){
        return self.apply(context, arguments.length ? args.concat(slice.call(arguments)): args)
    }
}

module.exports = bind
