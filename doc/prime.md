package: prime
==============

prime is an object-oriented JavaScript library.

# module: prime

## exports

The prime module exports a function which can create new _primes_.
The function returns a `constructor` method, extended with
the `implement` method.

## parameters

1. properties - (*object*) An object containing methods and special properties
that will be implemented on the constructor.

### property: constructor

When a method with `constructor` as its key gets passed as a property, it will
effectively become your prime. All subsequent properties (except specials)
will be implemented on this constructor as prototypes.

### property: inherits

When an object with `inherits` as its key gets passed as a property,
your constructor will inherit the passed in object's prototypes.

## sample

```js
// require prime
var prime = require('prime')

// create a new prime
var Point = prime({
    // constructor
    constructor: function(x, y){
        this.x = x
        this.y = y
    }
})

// another prime
var Shape = prime({
    constructor: function(point){
        this.position = point
    },
    // an area method
    area: function(){
        return 0
    },
    // circumference method
    circumference: function(){
        return 0
    }
})

var Circle = prime({
    // Circle inherits from Shape
    inherits: Shape,
    constructor: function(point, radius){
        // call Shape constructor
        Shape.call(this, point)
        this.radius = radius
    },
    // override area and circumference methods
    area: function(){
        return Math.PI * this.radius * this.radius
    },
    circumference: function(){
        return 2 * Math.PI * this.radius
    }
})

var Rectangle = prime({
    // like Circle, Rectangle also inherits from Shape
    inherits: Shape,
    constructor: function(point, a, b){
        Shape.call(this, point)
        this.a = a
        this.b = b
    },
    area: function(){
        return this.a * this.b
    },
    circumference: function(){
        return 2 * (this.a + this.b)
    }
})

// instantiate a new point
var point = new Point(20, 40)
// create a new circle
var circle = new Circle(point, 10)
// calculate the circumference of the circle
circle.circumference() // 20π
// Create a new rectangle and calculate its area
var rectangle = new Rectangle(point, 10, 20)
rectangle.area() // 200
```

## method: prime:implement

The constructor returned by `prime()` is extended with an `implement` method.
It implements new methods on a constructor's prototype. The function returns
the constructor.

### syntax

```js
MyPrime.implement(methods)
```

## parameters

1. methods - (*object*) An object with keys representing prototype names and
values representing prototype methods.

### sample

```js
Circle.implement({
    draw: function(){
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius,
            0, 2 * Math.PI, false)
        this.ctx.fillStyle = "#8ED6FF"
        this.ctx.fill()
    }
})
```

## module: emitter

Emitter is a module for managing and emitting events.

## exports

The module exports the emitter prime.

```js
var prime = require('prime')
var Emitter = require('prime/emitter')

var emitter = new Emitter()
emitter.on('touch', function(){
    console.log('touched')
})
emitter.emit('touch')

// inherit from emitter:
var MyPrime = prime({
    inherits: Emitter,
    constructor: function(){
        this.emit('ready')
    }
})
```

## method: on

Add a listener to the event emitter, with some specific name.
It returns the emitter instance.

## parameters

1. event - (*string*) the name of the event (e.g. 'complete').
2. fn - (*function*) the function to execute.

### sample

```js
emitter.on('complete', function(){
    console.log('I just completed my action')
})
```

## method: off

Removes an listener from the emitter. It's the opposite operation of `on`.
It returns the emitter instance.

## parameters

1. event - (*string*) the name of the event (e.g. 'complete').
2. fn - (*function*) the function to execute.

### sample

```js
var listener = function(){
    console.log('I just completed my action')
}
emitter.on('complete', listener)
// some while later
emitter.off('complete', listener)
```

## method: emit

`emit` calls all registered listeners for a specific event name.
It returns the emitter instance.

## parameters

1. event - (*string*) the name of the event (e.g. 'complete').
2. ...arguments - all arguments where `i > 0` are passed as arguments of the
listeners.

### sample

```js
emitter.on('complete', function(a, b){
    console.log('I just ' + a + ' my ' + b) // logs "I just completed my action"
})
emitter.emit('complete', 'completed', 'action')
```

# module: map

`map` is a constructor that returns an object that works like a object. Unlike a
object however, map instances can have any type of object as keys, rather than
just strings.

## exports

map is a prime.

```js
var map = require('prime/map')
var myMap = map()

myMap.set({a: 1}, {b: 1})
myMap.set({a: 2}, {b: 2})
myMap.values() // [{b: 1}, {b: 2}]
```

## method: set

Set a new value, or replace an old value.
It returns the map instance.

## parameters

1. key - (*mixed*) the key to insert or modify the map.
2. value - (*mixed*) the value to associate with the specified key.

### sample

```js
var myMap = map()
var key = {}
myMap.set(key, 'Michelle')
```

## method: get

Returns the value associated with the given key.

```js
var myMap = map()
var key = {}
myMap.set(key, 'Michelle')
myMap.get(key) // 'Michell'
```

## method: count

Returns the number of items in the map.

```js
var myMap = map()
myMap.set(1, 1).set(2, 2)
myMap.count() // 2
```

## method: forEach

Calls a function for each key-value pair in the map. The returned value is
the original map. If the passed function returns `false` the loop stops.

## parameters

1. fn - (*function*) The function which should be executed on each item in the
map. This function is passed the value and its key in the map.
2. context - (*object*, optional) The object to use as 'this' in the function.

### parameter: fn

##### arguments

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
var myMap = map()
myMap.set(1, 1).set(2, 2).set(3, 3)
myMap.forEach(function(value, key){
    console.log(value)
    return key < 2
})
// logs 1, 2.
// it doesn't log 3, because in the iteration of 2,
// false is returned so the loop stopped.
```

## method: map

Creates and returns a new map with the results of calling a provided function on
every value in the map.

## parameters

1. fn - (*function*) The function to produce a value of the new map from
an value of the current one.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
var myMap = map()
myMap.set(1, 1).set(2, 2).set(3, 3)
var timesTwo = myMap.map(function(value, key){
    return value * 2
}) // timesTwo now holds a map where the values are multiplied by 2.
```

## method: filter

Creates and returns a map with all of the elements of the map for
which the provided filtering function returns `true`.

## parameters

1. fn - (*function*) The function to test each element of the map. This
function is passed the value and its key in the map.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
var myMap = map()
myMap.set(1, 10).set(2, 20).set(3, 30)
var biggerThanTwenty = myMap.filter(function(value, key){
    return value > 20
}) // biggerThanTwenty now holds a map with only the last value (30)
```

## method: every

Returns `true` if every value in the map satisfies the provided testing
function, otherwise this method returns `false`.

## parameters

1. fn - (*function*) The function to test each element of the map. This
function is passed the value and its key in the map.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
myMap.set(1, 10).set(2, 20).set(3, 30)
var areAllBigEnough = myMap.every(function(value, key){
    return value > 20
}) // areAllBigEnough = false
```

## method: some

Returns `true` if at least one value in the map satisfies the provided
testing function, otherwise `false` is returned.

## parameters

1. fn - (*function*) The function to test each element of the map. This
function is passed the value and its key in the map.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
myMap.set(1, 10).set(2, 20).set(3, 30)
var areAnyBigEnough = myMap.some(function(value, key){
    return value > 20
}) // isAnyBigEnough = true
```

## method: indexOf

Returns the key which is associated with the first found value that is equal
to the passed value. If no value found, `null` is returned.

## parameters

1. item - (*mixed*) The item to search for in the map.

### sample

```js
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.index(10) // 1
myMap.index(40) // null
```

## method: remove

Removes the specified key from the map. Once the item is removed, the
removed value is returned.

## parameters

1. key - (*mixed*) The key to search for in the map.

### sample

```js
myMap = map()
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.remove(2) // 20
myMap.get(2) // null
```

## method: keys

Returns an array containing all the keys.

### sample

```js
myMap = map()
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.keys() // [1, 2, 3]
```

## method: values

Returns an array containing all the values of the map.

### sample

```js
var myMap = map()
myMap.set({a: 1}, {b: 1})
myMap.set({a: 2}, {b: 2})
myMap.values() // [{b: 1}, {b: 2}]
```

## module: defer

The module delays the execution of function to a later time.
Deferring a function returns a method that cancels the function execution.

## exports

A function object that provide different ways to delay the execution of a function.

```js
var defer = require("prime/defer")
var cancel = defer(function(){
    console.log("hello world")
})

// if you change your mind
cancel()
```

## method: immediate

Defers the execution of a function in the next iteration loop, as soon as possible.
In node.js environments it uses `process.nextTick`.
In internet explorer 10+ it uses `setImmediate`.
In modern browsers it uses a `postMessage`.
Falls back to `setTimeout 0`.

```js
var defer = require("prime/defer")
defer.immediate(function(){
    console.log("hello world")
})
```

### note

`defer()` is an alias for `defer.immediate()` (no second argument)
and `defer.timeout()` (second argument as timeout in milliseconds).

## method: frame

Like `defer.immediate`, however `defer.frame` defers the execution of a function on the next animation frame.
If `requestAnimationFrame` is not available, `defer.frame` falls back to `setTimeout` with a 1000 / 60 delay (60 fps).

```js
var defer = require("prime/defer")
defer.frame(function(){
    console.log("hello world")
})
```

### note

This is more resource friendly and faster than simply stacking `requestAnimationFrame` calls
(might depend on the native implementation), as every deferred function belonging
to the same call stack gets executed inside the same `requestAnimationFrame` call.

## method: timeout

Defers the execution of a function on a specified interval.

```js
var defer = require("prime/defer")
defer.timeout(function(){
    console.log("hello world")
}, 1000)
```

### note

This is more resource friendly and faster than simply stacking `setTimeout` calls
(might depend on the native implementation), as every deferred function belonging
to the same call stack with the same timeout gets executed inside the same `setTimeout` call.
