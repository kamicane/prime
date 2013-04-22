/*
prime
 - prototypal inheritance
*/"use strict"

var hasOwn = require("./object/hasOwn"),
    forIn  = require("./object/forIn"),
    mixIn  = require("./object/mixIn"),
    filter = require("./object/filter"),
    create = require("./object/create"),
    type   = require("./type")

var defineProperty           = Object.defineProperty,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

try {
    defineProperty({}, "~", {})
    getOwnPropertyDescriptor({}, "~")
} catch (e){
    defineProperty = null
    getOwnPropertyDescriptor = null
}

var define = function(value, key, from){
    defineProperty(this, key, getOwnPropertyDescriptor(from, key) || {
        writable: true,
        enumerable: true,
        configurable: true,
        value: value
    })
}

var copy = function(value, key){
    this[key] = value
}

var implement = function(proto){
    forIn(proto, defineProperty ? define : copy, this.prototype)
    return this
}

var verbs = /^constructor|inherits|mixin$/

var prime = function(proto){

    if (type(proto) === "function") proto = {constructor: proto}

    var superprime = proto.inherits

    // if our nice proto object has no own constructor property
    // then we proceed using a ghosting constructor that all it does is
    // call the parent's constructor if it has a superprime, else an empty constructor
    // proto.constructor becomes the effective constructor
    var constructor = (hasOwn(proto, "constructor")) ? proto.constructor : (superprime) ? function(){
        return superprime.apply(this, arguments)
    } : function(){}

    if (superprime){

        mixIn(constructor, superprime)

        var superproto = superprime.prototype
        // inherit from superprime
        var cproto = constructor.prototype = create(superproto)

        // setting constructor.parent to superprime.prototype
        // because it's the shortest possible absolute reference
        constructor.parent = superproto
        cproto.constructor = constructor
    }

    if (!constructor.implement) constructor.implement = implement

    var mixins = proto.mixin
    if (mixins){
        if (type(mixins) !== "array") mixins = [mixins]
        for (var i = 0; i < mixins.length; i++) constructor.implement(create(mixins[i].prototype))
    }

    // implement proto and return constructor
    return constructor.implement(filter(proto, function(value, key){
        return !key.match(verbs)
    }))

}

module.exports = prime
