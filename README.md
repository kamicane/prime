# ![prime](http://kamicane.github.io/assets/prime.png)

[![Package Info](http://img.shields.io/badge/npm-prime-blue.svg)](https://npmjs.org/package/prime)
[![NPM Version](http://img.shields.io/npm/v/prime.svg)](https://npmjs.org/package/prime)
[![Coverage Status](http://img.shields.io/coveralls/kamicane/prime/master.svg)](https://coveralls.io/r/kamicane/prime)
[![Build Status](http://img.shields.io/travis/kamicane/prime/master.svg)](http://travis-ci.org/kamicane/prime)
[![Dependencies Status](https://david-dm.org/kamicane/prime.svg?theme=shields.io)](https://david-dm.org/kamicane/prime)
[![DevDependencies Status](https://david-dm.org/kamicane/prime/dev-status.svg?theme=shields.io)](https://david-dm.org/kamicane/prime#info=devDependencies)


1. fundamental, basic, essential.
2. make (something) ready for use or action.
3. archetypal, prototypical, typical, classic.

## Description

prime is an Object Oriented JavaScript library. It helps you with prototypal inheritance and contains generic utilities for every-day JavaScripting.

No Native JavaScript Objects were harmed in the making of this library.

## Modules Overview

A short overview of the available modules. For more information, refer to the [documentation](https://github.com/mootools/prime/blob/master/doc/prime.md).

### prime

The function to create new primes.

```js
var prime = require("prime")

var Animal = prime({
    say: function(){
        return "!!"
    }
})

var Emitter = require("prime/emitter")

var Cat = prime({
    inherits: Animal,
    mixin: Emitter,
    say: function(){
        return "meaow" + Cat.parent.say.call(this)
    }
})
```

### prime/emitter

The event emitter.

```js
var Emitter = require("prime/emitter")

var Dog = prime({
    inherits: Animal,
    mixin: Emitter,
    say: function(){
        var word = "wuff" + Dog.parent.say.call(this)
        this.emit("say", word)
        return word
    }
})

var barkley = new Dog

barkley.on("say", function(word){
    console.log("barkley barked", word)
})
```

### prime/map

Map-like implementation.

```js
var Map = require("prime/map")

var map = new Map()

map.set(domElement, "header")
map.set(domElement2, "footer")
map.get(domElement) // "header"
map.get(domElement2) // "footer"
```

### prime/defer

Optimized timeouts / immediates / animationFrames.

```js
var defer = require("prime/defer")

defer.frame(function() {
    console.log('on next animation frame');
});

defer.immediate(function() {
    console.log('on platform next tick.');
});

defer.timeout(function() {
    console.log('late');
}, 500);
```

When all else fails, read the [full documentation](https://github.com/kamicane/prime/blob/master/doc/prime.md).
