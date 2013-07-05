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

Simple WeakMap-like object.

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

### prime/shell

Wraps every type in a special function containing every available method.
Use valueOf() / toString() to get the bare value.

```js
var _ = require("prime/shell")
_([10, 20, 30]).indexOf(1).times(function(n){}).valueOf() // 10
document.title = _(["hello-mootools"]).get(0).camelize()
```

### prime/array

A composite module of all the methods modules.
Available methods: every, filter, forEach, indexOf, map, remove, slice, some

```js
var array = require("prime/array")
array.indexOf([1,2,3], 1)
array([1,2,3]).indexOf(1)
```

Requiring individual methods as generics:

```js
var indexOf = require("prime/array/indexOf")
indexOf([1,2,3], 1)
```

### prime/object

A composite module of all the methods modules.
Available methods: count, create, every, filter, forIn, forOwn, indexOf, keys, map, mixIn, remove, some, values

```js
var object = require("prime/object")
object.count({a:1})
object({a:1}).count()
```

Requiring individual methods as generics:

```js
var count = require("prime/object/count")
count({a:1})
```

### prime/string

A composite module of all the methods modules.
Available methods: camelize, capitalize, clean, escape, hyphenate, trim

```js
var string = require("prime/string")
string.trim("  asdfg  ")
string("  asdfg  ").trim()
```

Requiring individual methods as generics:

```js
var trim = require("prime/string/trim")
trim(" asdfg ")
```

### prime/number

A composite module of all the methods modules.
Available methods: limit, random, round, times

```js
var fn = require("prime/number")
number.times(10, function(n){})
number(10).times(function(n){})
```

Requiring individual methods as generics:

```js
var times = require("prime/number/times")
times(10, function(n){})
```

### prime/function

A composite module of all the methods modules.
Available methods: bind

```js
var fn = require("prime/function")
fn.bind(function(){}, object)
fn(function(){}).bind(object)
```

Requiring individual methods as generics:

```js
var bind = require("prime/function/bind")
bind(function(){}, object)
```

### prime/date

A composite module of all the methods modules.
Available methods: now

```js
var date = require("prime/date")
date.now()
```

Requiring individual methods as generics:

```js
var now = require("date/now")
now()
```


[![Build Status](https://secure.travis-ci.org/mootools/prime.png?branch=master)](http://travis-ci.org/mootools/prime)
