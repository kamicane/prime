/*
prime
 - prototypal inheritance
*/"use strict"

var has = function(self, key){
    return Object.hasOwnProperty.call(self, key)
}

var each = function(object, method, context){
    for (var key in object) if (method.call(context, object[key], key, object) === false) break
    return object
}

if (!({valueOf: 0}).propertyIsEnumerable("valueOf")){ // fix for stupid IE enumeration bug

    var buggy = "constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString".split(",")
    var proto = Object.prototype

    each = function(object, method, context){
        for (var key in object) if (method.call(context, object[key], key, object) === false) return object
        for (var i = 0; key = buggy[i]; i++){
            var value = object[key]
            if ((value !== proto[key] || has(object, key)) && method.call(context, value, key, object) === false) break
        }
        return object
    }

}

var create = Object.create || function(self){
    var constructor = function(){}
    constructor.prototype = self
    return new constructor
}

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
var defineP = Object.defineProperty

try {
    var obj = {a: 1}
    getOwnPropertyDescriptor(obj, "a")
    defineP(obj, "a", {value: 2})
} catch (e){
    getOwnPropertyDescriptor = function(object, key){
        return {value: object[key]}
    }
    defineP = function(object, key, descriptor){
        object[key] = descriptor.value
        return object
    }
}

var implement = function(proto){
    each(proto, function(value, key){
        if (key !== "constructor" && key !== "define" && key !== "inherits")
            this.define(key, getOwnPropertyDescriptor(proto, key) || {
                writable: true,
                enumerable: true,
                configurable: true,
                value: value
            })
    }, this)
    return this
}

var prime = function(proto){

    var superprime = proto.inherits

    // if our nice proto object has no own constructor property
    // then we proceed using a ghosting constructor that all it does is
    // call the parent's constructor if it has a superprime, else an empty constructor
    // proto.constructor becomes the effective constructor
    var constructor = (has(proto, "constructor")) ? proto.constructor : (superprime) ? function(){
        return superprime.apply(this, arguments)
    } : function(){}

    if (superprime){

        var superproto = superprime.prototype
        // inherit from superprime
        var cproto = constructor.prototype = create(superproto)

        // setting constructor.parent to superprime.prototype
        // because it's the shortest possible absolute reference
        constructor.parent = superproto
        cproto.constructor = constructor
    }

    // inherit (kindof inherit) define
    constructor.define = proto.define || (superprime && superprime.define) || function(key, descriptor){
        defineP(this.prototype, key, descriptor)
        return this
    }

    // copy implement (this should never change)
    constructor.implement = implement

    // finally implement proto and return constructor
    return constructor.implement(proto)

}

prime.has    = has
prime.each   = each
prime.create = create
prime.define = defineP

module.exports = prime
