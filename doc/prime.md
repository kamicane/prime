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
that will get implemented to the constructor.

#### property: constructor

When a method with `constructor` as its key gets passed as a property, it will
effectively become your prime. Every subsequent property (except specials)
will get implemented to this constructor as prototypes.

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

prime:implement
---------------

The constructor returned by `prime()` is extended with an `implement` method.
It implement new methods to a constructor's prototype. The function returns
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

prime.each
----------

Iterates all the properties of an object, including those properties not
normally iterable in internet explorer such as `toString`, `valueOf`.
It returns the first `object` argument.

### syntax

```js
prime.each(object, function)
```

### parameters

1. object - (*object*) The object to iterate
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

prime.has
---------

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

### See Also

- [MDN Object.hasOwnProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

prime.create
------------

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

### See Also

- [MDN Object.create](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create)

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

### See Also

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

1. myArray - (*array*) Original array to map
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

### samples:

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

module: es5/function
====================

This module contains ECMAScript 5 function methods as generics.

exports
-------

The module exports an object with the function methods.

```js
var fn = require('prime/es5/function')

fn.apply(function(a, b, c){
    console.log(this, a, b, c) // "that", 1, 2, 3
}, "that", 1, 2, 3)
```

### methods

- `apply`
- `call`
- `bind` (if natively available on Function.prototype.bind)

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

### see also

[MDN Number](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number)

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

### see also

[MDN RegExp](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp)

module: es5/string
==================

This module contains ECMAScript 5 string methods as generics.
Native JavaScript methods will always get invoked where available,
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

module: types/number
====================

This module extends the `es/number` module, without modifying the `es5/number`
module.

exports
-------

The module exports an object with more, custom number methods.

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
2. fn   - (*function*) The function which should be executed on each iteration
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

module: types/string
====================

This module extends the `es/string` module, without modifying the `es5/string`
module.

exports
-------

The module exports an object with more, custom string methods.

```js
var string = require('prime/types/string')
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

module: util/shell
==================

A prime that mutates its implemented prototypes into methods that can be used as
generics. This special prime returns an object that inherits both prototypes
and generics from its ancestor. You should not probably bother with `shell`
unless you have a very specific reason to do so.

Returns a plain `[Object object]` whose `prototype` property is set to the
passed methods. Generics are also automatically generated for each of the
passed in methods, and attached to the object.

exports
-------

Exports the function used to create _shells_.

syntax
------

```js
var shell = require('prime/util/shell')

var myShell = shell(methods)
```

### parameters

1. methods - (*object*) An object containing methods.

### sample

```js
var shell = require('prime/util/shell'),
var plus = shell({
    add: function(num){
        return this + num
    },
    one: function(){
        return plus.add(this, 1)
    }
})
// now we can call the functions
plus.add(4, 5) // returns 9
plus.one(4) // returns 5

// implement a new method, with .implement (it is a prime afterall)
plus.implement({
    two: function() {
        return plus.add(this, 2)
    }
})
plus.two(18) // returns 20
```

To extend a shell, without affecting the original shell, it is possible to
inherit from a shell:

```js
var arithmetic = shell({
    inherits: plus,
    multiply: function(num){
        return this * num
    },
    divide: function(num){
        return this / num
    }
})
arithmetic.add(4, 6) // 10
arithmetic.multiply(4, 3) // 12
arithmetic.divide(20, 4) // 5
```

Shells can inherit from another shell, primes or any other javascript constructor:

```js
var object = shell({
    set: function(key, value){
        this[key] = value
        return this
    },
    get: function(key){
        return this[key]
    }
})
object.set({}, 'shell', 'prime') // {shell: 'prime'}

var prime = require('prime')
var hash = prime({
    inherits: object,
    values: function(){
        var values = []
        for (var key in this) values.push(this[key])
        return values
    }
})

var myHash = new hash()
myHash.set('shell', 'prime')
myHash.set('primes', [2, 3, 5, 7, 11])
myHash.values() // ['prime', [2, 3, 5, 7, 11]]
```
