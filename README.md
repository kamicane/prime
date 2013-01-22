
#prime |prīm|

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

var Cat = prime({
    inherits: Animal,
    say: function(){
        return "meaow" + Cat.parent.say.call(this)
    }
})
```
### prime/shell

The base shell. As you require more shells, the base shell will be augmented.
Requiring specific shells gives you access to generic methods as well.
```js
var array = require("prime/shell/array")

array.indexOf([1,2,3], 3) // 3

var _ = require("prime/shell")

_([1,2,3]).remove(1).each(function(number){
    console.log(number)
})
```
### prime/emitter

The event emitter.
```js
var Emitter = require("prime/emitter")

var Dog = prime({
    inherits: Animal,
    say: function(){
        var word = "wuff" + Dog.parent.say.call(this)
        this.emit("say", word)
        return word
    }
})

Dog.implement(new Emitter)

var barkley = new Dog

barkley.on("say", function(word){
    console.log("barkley barked", word)
})
```
### prime/map

Simple WeakMap implementation.
```js
var Map = require("prime/map")

var map = new Map()

map.set(domElement, "header")
map.set(domElement2, "footer")
map.get(domElement) // "header"
map.get(domElement2) // "footer"
```
### prime/type

Type checker.
```js
var type = require("prime/type")

type("string") // "string"
type([]) // "array"
type(function(){}) // "function"
type(/regexp/) // "regexp"
type(new Date) // "date"
type(10) // "number"
type(false) // "boolean"
type({}) // "object"
type(arguments) // "object"

type(null) // "null"
type(undefined) // "null"
type(NaN) // "null"
```
### prime/shell/array

Array methods.

```js
require("prime/shell/array")
```

### prime/shell/object

Object methods.

```js
require("prime/shell/object")
```

### prime/shell/string

String methods.

```js
require("prime/shell/string")
```

### prime/shell/number

Number methods.

```js
require("prime/shell/number")
```

### prime/shell/function

Function methods.

```js
require("prime/shell/function")
```

### prime/shell/regexp

Regexp methods.

```js
require("prime/shell/regexp")
```

### prime/shell/date

Date methods.

```js
require("prime/shell/date")
```


[![Build Status](https://secure.travis-ci.org/mootools/prime.png?branch=master)](http://travis-ci.org/mootools/prime)
