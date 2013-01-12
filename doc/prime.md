package: prime
==============

 1. fundamental, basic, essential.
 2. make (something) ready for use or action.
 3. archetypal, prototypical, typical, classic.

Prime is a prototypal inheritance helper.

module: prime
-------------

### exports

The prime module exports a function which can create new _primes_.
The function returns a `constructor` method, extended with
the `implements` method.

### parameters

1. properties (*object*) - An object containing methods and special properties
that will be implemented on the constructor.

#### property: constructor

When a method with `constructor` as its key gets passed as a property, it will
effectively become your prime. All subsequent properties (except specials)
will be implemented on this constructor as prototypes.

#### property: inherits

When an object with `inherits` as its key gets passed as a property,
your constructor will inherit the passed in object's prototypes.

### sample

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

method: prime:implement
-----------------------

The constructor returned by `prime()` is extended with an `implement` method.
It implements new methods on a constructor's prototype. The function returns
the constructor.

### syntax

```js
MyPrime.implement(methods)
```

### parameters

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

function: prime.each
--------------------

Iterates all the properties of an object, including those properties not
normally iterable in internet explorer, such as `toString` and `valueOf`.
It returns the first `object` argument.

### syntax

```js
prime.each(object, function)
```

### parameters

1. object - (*object*) The object to iterate.
2. function - (*function*) The function called for each property.
3. context - (*object*) The context of the passed function.

### sample

```js
// alerts 'The first day of the week is Sunday'
// 'The second day of the week is Monday', etc.:
var days = {first: 'Sunday', second: 'Monday', third: 'Tuesday'}
prime.each(days, function(value, key){
    alert('The ' + key + ' day of the week is ' + value)
})
```

function: prime.has
-------------------

Checks if the object has the specified key as one of its own properties (not
including properties found in the prototype chain). Returns `true` if this is
the case, otherwise it returns `false`.

### parameters

1. object - (*object*) The object.
2. property - (*string*) The name of the property to check for.

### sample

```js
// A simple plain object
var object = {color: 'red'}
// Circle prime, from the prime example
var circle = new Circle(new Point(10, 30), 4)
prime.has(object, 'color') // true
prime.has(object, 'size') // false
prime.has(circle, 'radius') // true (defined in the Circle constructor)
prime.has(circle, 'circumference') // false (it is only on the prototype)
// compared to the 'in' operator
'circumference' in circle // true
```

### see also

- [MDN Object.hasOwnProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

function: prime.create
----------------------

Creates a new instance of an empty constructor whose prototype is set to the
passed in object. This is mainly used for inheritance, to instantiate a prime
without having to invoke its constructor. Uses the native `Object.create`
where available. Unless you have a very specific reason to use this, you should
use `prime` instead, and its `inherits` metamethod.

### syntax

```js
prime.create(proto)
```

### parameters

- proto - (*object*) The prototype of the instantiated empty constructor.
created object

### Returns

- (*object*) An instance of the empty constructor.

### sample

```js
var object = prime.create({
    set: function(key, value){
        this[key] = value
    },
    get: function(key){
        return this[key]
    }
})
object.set('foo', 'bar')

// for inheritance
var Square = function(size){
    Rectangle.call(this, size, size)
}

// makes Square inherit from Rectangle, without having to instantiate a new Rectangle
Square.prototype = prime.create(Rectangle.prototype)

var square = new Square(5)
square.area() // 25
```

### see also

- [MDN Object.create](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create)

function: prime.define
----------------------

Defines a new property on an object and returns the object.
The descriptor should have at least the `value` property. Other descriptor
properties are only supported in ES5 compatible environments.

### sample

```js
var object = {}
prime.define(object, 'number', {
    value: 1,
    enumerable: false
})

console.log(object.number) // 1
```

### parameters

1. object (*object*) The object on which to define the property.
2. key (*string*) The property name.
3. descriptor (*object*) A property descriptor for the property being defined.

### see also

- [MDN Object.defineProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)

module: es5/array
=================

This module contains ECMAScript 5 array methods as generics.
Native JavaScript methods will always get invoked where available,
otherwise a compliant JavaScript substitute will be used.

exports
-------

The module exports an object containing all the array methods.

```js
var array = require('prime/es5/array')
array.indexOf([1, 2, 3], 2) // 1
```

All ES3 Array methods are added as generics as well:

```js
(function(){
    var args = array.slice(arguments) // [1, 2, 3]
    array.push(args, 4) // [1, 2, 3, 4]
})(1, 2, 3)
```

### note

- `array` is a [shell](#util/shell).

method: filter
--------------

Returns a new array with the elements of the original array for which the
provided filtering function returns `true`.

### syntax

```js
var filteredArray = array.filter(myArray, fn[, context])
```

### parameters

1. myArray - (*array*) The array to filter.
1. fn - (*function*) The function to test each element of the array. This
function is passed the item and its index in the array.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### syntax

```js
fn(item, index, array)
```

##### arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### sample

```js
var biggerThanTwenty = array.filter([10, 3, 25, 100], function(item, index){
    return item > 20
}) // biggerThanTwenty = [25, 100]
```

### see also:

- [MDN Array:filter](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter)

method: indexOf
---------------

Returns the index of the first element within the array equal to the specified
value, or -1 if the value is not found.

### parameters

1. item - (*object*) The item to search for in the array.
2. from - (*number*, optional: defaults to 0) The index of the array at which
to begin the search.

### samples

```js
array.indexOf(['apple', 'lemon', 'banana'], 'lemon') // returns 1
array.indexOf(['apple', 'lemon'], 'banana'); // returns -1
```

### see also

- [MDN Array:indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf)

method: map
-----------

Creates a new array with the results of calling a provided function on every
element in the array.

### syntax

```js
var mappedArray = array.map(myArray, fn[, context])
```

### parameters

1. myArray - (*array*) Original array to map.
2. fn - (*function*) The function to produce an element of the new Array from
an element of the current one.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### argument: fn

##### syntax

```js
fn(item, index, array)
```

##### arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### sample

```js
var timesTwo = array.map([1, 2, 3], function(item, index){
    return item * 2
}) // timesTwo = [2, 4, 6]
```

### see also

- [MDN Array:map](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map)

method: every
-------------

Returns true if every element in the array satisfies the provided testing
function.

### syntax

```js
var allPassed = array.every(myArray, fn[, context])
```

### parameters

1. myArray - (*array*) The array with the elements that should be checked.
2. fn - (*function*) The function to test for each element.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### syntax

```js
fn(item, index, array)
```

##### arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### samples

```js
var areAllBigEnough = array.every([10, 4, 25, 100], function(item, index){
    return item > 20
}) // areAllBigEnough = false
```

### see also

- [MDN Array:every](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every)

method: some
------------

Returns true if at least one element in the array satisfies the provided
testing function.

### syntax

```js
var somePassed = array.some(myArray, fn[, context])
```

### parameters

1. myArray - (*array*) The array with the elements that should be checked.
2. fn - (*function*) The function to test for each element. This function is
passed the item and its index in the array.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### syntax

```js
fn(item, index, array)
```

##### arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### samples

```js
var isAnyBigEnough = array.some([10, 4, 25, 100, function(item, index){
    return item > 20;
}); // isAnyBigEnough = true
```

### see also

- [MDN Array:some](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some)

method: forEach
---------------

Used to iterate through arrays, or iterables that are not regular arrays, such
as built in getElementsByTagName calls or arguments of a function. This method
doesn't return anything.

### syntax

```js
array.forEach(myArray, fn[, context])
```

### parameters

1. myArray - (*array*) The array to iterate through.
2. fn - (*function*) The function to test for each element.
3. context - (*object*, optional) The object to use as 'this' within the
function.

#### parameter: fn

##### syntax

```js
fn(item, index, object)
```

##### arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array. In the case of an
object, it is passed the key of that item rather than the index.
3. object - (*mixed*) The actual array/object.

### sample

```js
array.forEach(['Sun', 'Mon', 'Tue'], function(day, index){
    alert('name:' + day + ', index: ' + index)
}) // alerts 'name: Sun, index: 0', 'name: Mon, index: 1', etc.
```

### see also

- [MDN Array:forEach](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach)

function: isArray
-----------------

Returns `true` if the object is an array, otherwise `false`.

### syntax

```js
array.isArray(object)
```

### parameters

1. object (*mixed*) The object to be checked if it's an array.

### samples

```js
array.isArray([1, 2, 3]) // true for arrays
array.isArray('moo') // false for any other type
array.isArray({length: 1, 0: 'hi'}) // also false for array-like objects
```

### note

- This function is a 'static' function, so not like other methods on this
[shell](#util/shell).

### see also

- [MDN Array.isArray](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray)

module: es5/date
================

This module contains ECMAScript 5 function methods as generics for date.

export
------

The module exports an object with date methods.

```js
var date = require('prime/es5/date')
console.log(date.now()) // logs the current time in ms.
console.log(date.getDate(new Date())) // logs something like "29"
```

### methods

`date` contains all methods which are defined on Date.prototype by ES5.

### see also

[MDN Date](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date)

function: date.now
------------------

`date.now` returns the numeric representation of the current time, as
milliseconds.

### sample

```js
console.log(date.now()) // logs something like "1356793632564"
```

### see also

[MDN Date.now](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now)

module: es5/function
====================

This module contains ECMAScript 5 function methods as generics.

exports
-------

The module exports an object with the function methods.

```js
var fn = require('prime/es5/function')

fn.call(function(a, b, c){
    console.log(this, a, b, c) // "that", 1, 2, 3
}, "that", 1, 2, 3)
```

### methods

- `apply`
- `call`
- `bind` (if natively available on Function.prototype.bind)
- `isGenerator` (if natively available)
- `toString`

### see also

[MDN Function](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function)

module: es5/number
==================

This module contains ECMAScript 5 number methods as generics.

exports
-------

```js
var number = require('prime/es5/number')

number.toFixed(3.14, 3) // "3.140"
```

### methods

- `toExponential`
- `toFixed`
- `toPrecision`
- `toLocaleString`
- `toString`
- `valueOf`

### see also

[MDN Number](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number)

module: es5/object
==================

Implements the `Object.prototype` methods a generics.

exports
-------

```js
var object = require('prime/es5/object')
var test = {autobot: 'optimus'}
object.hasOwnProperty(test, 'autobot') // true
object.hasOwnProperty(test, 'decepticons') // false
```

### methods

- `hasOwnProperty`
- `isPrototypeOf`
- `propertyIsEnumerable`
- `toLocaleString`
- `toString`
- `valueOf`

### see also

[MDN Object](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object)

module: es5/regexp
==================

Like `es5/function` or `es5/number` this module contains ES5 methods as
generics.

exports
-------

```js
var regexp = require('prime/es5/regexp')

regexp.test(/\w+$/, '---abc') // true
```

### methods

- `test`
- `exec`
- `toString`

### see also

[MDN RegExp](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp)

module: es5/string
==================

This module contains ECMAScript 5 string methods as generics.
Native JavaScript methods will always get invoked when available,
otherwise a compliant JavaScript substitute will be used.

exports
-------

The module exports an object containing all the string methods.

```js
var string = require('prime/es5/string')

string.trim('   i like cookies    ') // "i like cookies"
string.charAt('charAt', 4) // 'A'
```

### see also

[MDN String](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String)

method: trim
------------

Trims the leading and trailing spaces off a string.

### sample

```js
string.trim('    i like cookies     ') // returns 'i like cookies'
```

### see also

[MDC String:trim](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/trim)

module: shell
=============

Shell makes chaining of methods possible. It exports a function that accepts one
parameter, and returns a so called *ghost* object. This object contains all
methods that are defined for this type variable. Each method returns the ghost
object of the value after the method is called, which creates chaining. To get
the original value, the `valueOf` method can be used.

It also defines the basic type objects that can be used by other modules to add
methods (which is done by **es5** and **shell** modules). Those objects are
called *shells*. Shells are prime objects, so they have an `implement` method.
When the `implement` method is used, the method is implemented as generic on the
shell object, on the prototype of the shell object, as well as on the ghost
object.

exports
-------

The module exports the `shell` function.

```js
var shell = require('prime/shell')
shell('  1,2,3  ').trim().split(',').forEach(function(value){
    console.log(value)
}) // logs 1, 2, 3

// array is a 'shell'
var array = require('prime/shell/array')
// we can add new methods with the implement method
array.implement({
    sum: function(){
        var sum = 0
        for (var i = 0; i < this.length; i++) sum += this[i]
        return sum
    }
})
// and use the newly added method
array.sum([3, 4, 7]) // 14
// we can also use it together with the shell function
shell([3, 4, 7]).sum().valueOf() // 14

// alternatively the constructor of a shell returns a ghost object,
// to 'cast' variables.
array(document.querySelectorAll('a')).each(function(node){
    node.style.color = 'red'
})
```

### sample

```js
shell("some string") // returns an Ghost instance for strings
shell([1, 2, 3, 10]) // returns an Ghost instance for arrays
shell(null) // returns null, there is not an object registered for null values
```

prime: Ghost
------------

`Ghost` is a wrapper around the value, returned by the `shell` function, which
has the following methods:

#### method: valueOf

`valueOf` returns the primitive value of the ghost.

```js
shell(10).valueOf() // 10
shell(50) + 3 // 53
shell("1,2,3,4").split(",").valueOf() // [1, 2, 3, 4]
```

- [MDN valueOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/valueOf)

#### method: toString

`toString` returns the string representation of the value of the ghost.

```js
shell(40) // "40"
shell("pri") + "me" // "prime"
shell(4) + "5" // "45"
shell(42).toString() // "42"
```

- [MDN toString](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/toString)

#### method: is

Checks if the value of the Ghost strictly equals another value.

```js
shell(20).is(20) // true
shell("20").is(20) // false
```

module: shell/array
===================

This module implements extra methods in the `es5/array` module.

exports
-------

The module exports the same object as `es5/array`, and adds new methods to it.

```js
var array = require('prime/shell/array')
array.backwards([1, 2, 3], function(value){
    console.log(value)
}) // logs 3, 2, 1
```

method: set
-----------

Set a new value, or replace an old value.
It returns the array.

### parameters

1. index (*number*) - the index in the array to insert or modify the array.
2. value - (*mixed*) the value to associate with the specified index.

### sample

```js
var myArray = [1, 2, 3]
array.set(myArray, 1, 'Michelle') // [1, 'Michell', 3]
```

method: get
-----------

Returns the value associated with the given index.

```js
var myArray = [1, 2, 3]
array.get(myArray, 2) // 3
```

method: count
-------------

Returns the number of items in the array

```js
var myArray = [1, 2, 3, 4]
array.count(myArray) // 4
```

method: each
------------

Calls a function for each key-value pair in the object. The returned value is
the original array. If the function returns `false` the loop stops.

### parameters

1. fn - (*function*) The function which should be executed on each item in the
array. This function is passed the value and its key in the array.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### arguments

1. value - (*mixed*) The current value in the array.
2. key   - (*number*) The current value's index in the array.
3. array - (*array*) The actual array.

### sample

```js
array.each(["Sunday", "Monday", "Tuesday"], function(value, key){
    console.log(value)
    return key < 1
}) // logs only "Sunday", "Monday", because it is stopped after "Monday"
```

### see also

[prime.each](#method: prime.each)
[array.forEach](#method: forEach)

method: backwards
-----------------

Like `array.each`, but calls the function in the reversed order.

### sample

```js
array.backwards([1, 2, 3], function(value){
    console.log(value)
}) // logs 3, 2, 1
```

method: index
-------------

Like `array.indexOf`, but returns `null` if the value is not in the array.

### sample

```js
array.index([1, 2, 3, 4], 3) // 2
array.index([1, 2, 3, 4], 6) // null
```

method: remove
--------------

Remove a value, by index, from the array.
The method returns the removed value.

### sample

```js
var cities = ['London', 'Rome', 'Amsterdam', 'San Francisco']
array.remove(cities, 1) // returns 'Rome'
// cities is now ['London', 'Amsterdam', 'San Francisco']
```

module: shell/date
==================

Shell module which exports the `es5/date` module.

exports
-------

Date shell object.

```js
var date = require('prime/shell/date')
date.getDate(new Date()) // day of the month, something like 12.
```

module: shell/function
======================

Shell module which exports the `es5/function` module.

exports
-------

Function shell object.

```js
var fn = require('prime/shell/function')
// fix temperature scale
fn.call(function(fahrenheit){
    return (fahrenheit - 32) * 5 / 9 + 273.15
}, null, 60) // 288.706
```

module: shell/number
====================

This module implements extra methods in the `es5/number` module.

exports
-------

The module exports the same object as `es5/number`, and adds new methods to it.

method: limit
-------------

Returns the number limited between two bounds.

### syntax

```js
myNumber.limit(min, max);
```

### parameters

1. min - (*number*) The minimum possible value.
2. max - (*number*) The maximum possible value.

### sample

```js
number.limit(12, 2, 6.5)  // returns 6.5
number.limit(-4, 2, 6.5)  // returns 2
number.limit(4.3, 2, 6.5) // returns 4.3
```

method: round
-------------

Returns this number rounded to the specified precision.

### parameters

1. precision - (*number*, optional: defaults to 0) The number of digits after
the decimal place. This can also be an negative number.

### sample

```js
number.round(12.45)     // returns 12
number.round(12.45, 1)  // returns 12.5
number.round(12.45, -1) // returns 10
```

method: times
-------------

Executes the function passed in the specified number of times.
Returns the original number.

### syntax

```js
number.times(num, fn[, context])
```

### parameters

1. num  - (*number*) The number of times the function should be executed.
2. fn   - (*function*) The function that should be executed on each iteration
of the loop. This function is passed the current iteration's index.
3. bind - (*object*, optional) The object to use as 'this' in the function.

### sample

```js
number.times(4, alert); // alerts "0", then "1", then "2", then "3".
```

method: random
--------------

Returns a random integer between the two passed in values.

### parameters

1. min - (*number*) The minimum value (inclusive).
2. max - (*number*) The maximum value (inclusive).

### sample

```js
number.random(5, 20); // returns a random number between 5 and 20.
```

module: shell/object
====================

This module implements new methods in the `es5/object` module.

exports
-------

The module exports the same object as `es5/object`, and adds new methods to it.

```js
var object = require('prime/shell/object')
```

method: set
-----------

Set a new value, or replace an old value.
It returns the object.

### parameters

1. key (*string*) - the key to insert or modify the object.
2. value - (*mixed*) the value to associate with the specified key.

### sample

```js
var data = {}
object.set(data, 'name', 'Michelle')
data.name // Michelle
```

method: get
-----------

Returns the value associated with the given key.

```js
var data = {name: 'Michelle'}
object.get(object, 'name') // Michelle
```

method: count
-------------

Returns the number of items in the object.

```js
var data = {firstname: 'Neil', lastname: 'Armstrong', age: 82}
object.count(data) // 3
```

method: each
------------

Calls a function for each key-value pair in the object. The returned value is
the original object. If `false` is returned in the function, the loop will be
stopped.

### parameters

1. fn - (*function*) The function which should be executed on each item in the
object. This function is passed the value and its key in the object.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### arguments

1. value  - (*mixed*) The current value in the object.
2. key    - (*mixed*) The current value's key in the object.
3. object - (*object*) The actual object.

### sample

```js
object.each({
    first: "Sunday",
    second: "Monday",
    third: "Tuesday"
}, function(value, key){
    console.log("the " + key + " day of the week is " + value)
    return key != 'second'
})
// logs "the first day of the week is Sunday",
// "the second day of the week is Monday", but is then stopped so it will not
// log "the third day of the week is Tuesday"
```

### see also

[prime.each](#method: prime.each)

method: map
-----------

Creates a new object with the results of calling a provided function on
every value in the object. This function returns the new mapped object.

### parameters

1. fn - (*function*) The function to produce a value of the new object from
an value of the current one.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value  - (*mixed*) The current value in the object.
2. key    - (*mixed*) The current value's key in the object.
3. object - (*object*) The actual object.

### sample

```js
var timesTwo = object.map({a: 1, b: 2, c: 3}, function(value, key){
    return value * 2
}) // timesTwo now holds an object containing: {a: 2, b: 4, c: 6}
```

method: filter
--------------

Creates and returns a object with all of the elements of the object for
which the provided filtering function returns `true`.

### parameters

1. fn - (*function*) The function to test each element of the object. This
function is passed the value and its key in the object.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value  - (*mixed*) The current value in the object.
2. key    - (*mixed*) The current value's key in the object.
3. object - (*object*) The actual object.

### sample

```js
var biggerThanTwenty = object.filter({a: 10, b: 20, c: 30}, function(value, key){
    return value > 20
}) // biggerThanTwenty now holds an object containing: {c: 30}
```

method: every
-------------

Returns `true` if every value in the object satisfies the provided testing
function, otherwise this method returns `false`.

### parameters

1. fn - (*function*) The function to test each element of the object. This
function is passed the value and its key in the object.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value  - (*mixed*) The current value in the object.
2. key    - (*mixed*) The current value's key in the object.
3. object - (*object*) The actual object.

### sample

```js
var areAllBigEnough = object.every({a: 10, b: 4, c: 25}, function(value, key){
    return value > 20
}) // areAllBigEnough = false
```

method: some
------------

Returns `true` if at least one value in the object satisfies the provided
testing function, otherwise `false` is returned.

### parameters

1. fn - (*function*) The function to test each element of the object. This
function is passed the value and its key in the object.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter arguments of fn

1. value  - (*mixed*) The current value in the object.
2. key    - (*mixed*) The current value's key in the object.
3. object - (*object*) The actual object.

### sample

```js
var areAnyBigEnough = object.some({a: 10, b: 4, c: 25}, function(value, key){
    return value > 20
}) // isAnyBigEnough = true
```

method: index
-------------

Returns the key which is associated with the first found value that is equal
to the passed value. If no value found, `null` is returned.

### parameters

1. item - (*mixed*) The item to search for in the object.

### sample

```js
var data = {a: 'one', b: 'two', c: 'three'}
object.index(object, 'two')   // b
object.index(object, 'three') // c
object.index(object, 'four') // null
```

method: remove
--------------

Removes the specified key from the object. Once the item is removed, the
removed value is returned.

### parameters

1. key - (*string*) The key to search for in the object.

### sample

```js
var data = {name: 'John', lastName: 'Doe'}
object.remove(object, 'lastName') // returns 'Doe'
// object now holds an object containing: { 'name': 'John' }
```

method: keys
------------

Returns an array containing all the keys.

### sample

```js
var data = {name: 'John', lastName: 'Doe'}
object.keys(data) // ['name', 'lastName']
```

### see also

[MDN Object.keys](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys)

method: values
--------------

Returns an array containing all the values of the object.

### sample

```js
var data = {name: 'John', lastName: 'Doe'}
object.values(data) // ['John', 'Doe']
```

module: shell/regexp
====================

Shell module which exports the `es5/regexp` module.

exports
-------

Regexp shell object.

```js
var regexp = require('prime/shell/regexp')
regexp.test(/\s/, 'no-spaces') // false
```

module: shell/string
====================

This module implements new methods in the `es5/string` module.

exports
-------

The module exports the `es5/string` object, and adds more, custom string
methods.

```js
var string = require('prime/shell/string')
string.capitalize('i like cookies') // "I Like Cookies"
```

method: clean
-------------

Removes all extraneous whitespace from a string and trims it.

### sample

```js
string.clean(' i      like     cookies      \n\n') // returns 'i like cookies'
```

method: camelize
----------------

Converts a hyphenated string to a camelcased string.

### sample

```js
string.camelize('I-like-cookies') // returns 'ILikeCookies'
```

method: hyphenate
-----------------

Converts a camelcased string to a hyphenated string.

### sample

```js
string.hyphenate('ILikeCookies') // returns '-i-like-cookies'
```

method: escape
--------------

Escape an string so it can safely be used in a regular expression.

### sample

```js
string.escape('(un)believable') // "\(un\)believable"
```

method: number
--------------

Tries to parse a string into an number.

### sample

```js
string.number('3.14deg') // 3.14
```

module: util/emitter
====================

Emitter is a module for managing and emitting events.

exports
-------

The module exports the emitter prime.

```js
var prime = require('prime')
var Emitter = require('prime/util/emitter')

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

method: on
----------

Add a listener to the event emitter, with some specific name.
It returns the emitter instance.

### parameters

1. event - (*string*) the name of the event (e.g. 'complete').
2. fn - (*function*) the function to execute.

### sample

```js
emitter.on('complete', function(){
    console.log('I just completed my action')
})
```

method: off
-----------

Removes an listener from the emitter. It's the opposite operation of `on`.
It returns the emitter instance.

### parameters

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

method: emit
------------

`emit` calls all registered listeners for a specific event name.
It returns the emitter instance.

### parameters

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

module: util/map
======================

`map` is a constructor that returns an object that works like a object. Unlike a
object however, map instances can have any type of object as keys, rather than
just strings.

exports
-------

map is a prime.

```js
var map = require('prime/util/map')
var myMap = map()

myMap.set({a: 1}, {b: 1})
myMap.set({a: 2}, {b: 2})
myMap.values() // [{b: 1}, {b: 2}]
```

method: set
-----------

Set a new value, or replace an old value.
It returns the map instance.

### parameters

1. key (*mixed*) - the key to insert or modify the map.
2. value - (*mixed*) the value to associate with the specified key.

### sample

```js
var myMap = map()
var key = {}
myMap.set(key, 'Michelle')
```

method: get
-----------

Returns the value associated with the given key.

```js
var myMap = map()
var key = {}
myMap.set(key, 'Michelle')
myMap.get(key) // 'Michell'
```

method: count
-------------

Returns the number of items in the map.

```js
var myMap = map()
myMap.set(1, 1).set(2, 2)
myMap.count() // 2
```

method: each
------------

Calls a function for each key-value pair in the map. The returned value is
the original map. If the function returns `false` the loop stops.

### parameters

1. fn - (*function*) The function which should be executed on each item in the
map. This function is passed the value and its key in the map.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### parameter: fn

##### arguments

1. value - (*mixed*) The current value in the map.
2. key   - (*mixed*) The current value's key in the map.
3. map   - (*map*) The actual map.

### sample

```js
var myMap = map()
myMap.set(1, 1).set(2, 2).set(3, 3)
myMap.each(function(value, key){
    console.log(value)
    return key < 2
})
// logs 1, 2.
// it doesn't log 3, because in the iteration of 2,
// false is returned so the loop stopped.
```

### see also

[prime.each](#method: prime.each)

method: backwards
-----------------

Exactly like `map.each`, except that the loop is reversed.

### sample

```js
var myMap = map()
myMap.set(1, 1).set(2, 2).set(3, 3)
myMap.backwards(function(value, key){
    console.log(value)
}) // logs 3, 2, 1
```

method: map
-----------

Creates a new map with the results of calling a provided function on
every value in the map. This function returns the new mapped map.

### parameters

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

method: filter
--------------

Creates and returns a map with all of the elements of the map for
which the provided filtering function returns `true`.

### parameters

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

method: every
-------------

Returns `true` if every value in the map satisfies the provided testing
function, otherwise this method returns `false`.

### parameters

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

method: some
------------

Returns `true` if at least one value in the map satisfies the provided
testing function, otherwise `false` is returned.

### parameters

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

method: index
-------------

Returns the key which is associated with the first found value that is equal
to the passed value. If no value found, `null` is returned.

### parameters

1. item - (*mixed*) The item to search for in the map.

### sample

```js
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.index(10) // 1
myMap.index(40) // null
```

method: remove
--------------

Removes the specified key from the map. Once the item is removed, the
removed value is returned.

### parameters

1. key - (*mixed*) The key to search for in the map.

### sample

```js
myMap = map()
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.remove(2) // 20
myMap.get(2) // null
```

method: keys
------------

Returns an array containing all the keys.

### sample

```js
myMap = map()
myMap.set(1, 10).set(2, 20).set(3, 30)
myMap.keys() // [1, 2, 3]
```

method: values
--------------

Returns an array containing all the values of the map.

### sample

```js
var myMap = map()
myMap.set({a: 1}, {b: 1})
myMap.set({a: 2}, {b: 2})
myMap.values() // [{b: 1}, {b: 2}]
```

module: type
============

The type module can use used to determine a type of a specified value.

exports
-------

A function that determines the type of a value. The returned value is a string.

```js
var type = require('prime/util/type')

type([1, 2])        // array
type("ciao")        // string
type(/_/)           // regexp
type(function(){})  // function
type(10)            // number
type(Inifity)       // number
type(NaN)           // null
type(true)          // boolean
type(false)         // boolean
type({a: 2})        // object
(function(){
    type(arguments) // object
})()
type(null)          // null
type(undefined)     // null
```
