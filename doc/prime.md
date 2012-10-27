# prime

 1. fundamental, basic, essential.
 2. make (something) ready for use or action.
 3. archetypal, prototypical, typical, classic.


Prime is a prototypal inheritance helper.

### Syntax

```js
var MyPrime = prime(properties)
```

### Parameters

1. properties (*object*) - An object containing methods and special properties
that will get implemented to the constructor.

#### Property: constructor

When a method with `constructor` as its key gets passed as a property, it will
effectively become your prime. Every subsequent property (except specials)
will get implemented to this constructor as prototypes.

#### Property: inherits

When an object with `inherits` as its key gets passed as a property,
your constructor will inherit the passed in object's prototypes.

### Returns

- (*function*) The `constructor` method, extended with
the `implements` method.

### Example

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

## prime:implement

Implement new methods to a constructor's prototype.

### Syntax

```js
MyPrime.implement(methods)
```

### Parameters

1. methods - (*object*) An object with keys representing prototype names and
values representing prototype methods.

### Returns

- (*prime*) the constructor.

### Example

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

## prime.each

Iterates all the properties of an object, including those properties not
normally iterable in internet explorer such as `toString`, `valueOf`.

### Syntax

```js
prime.each(object, function)
```

### Parameters

1. object - (*object*) The object to iterate
2. function - (*function*) The function called for each property.
3. context - (*object*) The context of the passed function.

### Returns

- (*object*) the first argument.

### Example

```js
// alerts 'The first day of the week is Sunday'
// 'The second day of the week is Monday', etc.:
var days = {first: 'Sunday', second: 'Monday', third: 'Tuesday'}
prime.each(days, function(value, key){
    alert('The ' + key + ' day of the week is ' + value)
})
```

## prime.has

Checks if the object has the specified key as one of its own properties (not
including properties found in the prototype chain).

### Syntax

```js
prime.has(object, property)
```

### Parameters

1. object - (*object*) The object.
2. property - (*string*) The name of the property to check for.

### Returns

- (*boolean*) `true` if the property is found, `false` if not (or if the
property only exists in the prototype chain)

### Example

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

## prime.create

Creates a new instance of an empty constructor whose prototype is set to the
passed in object. This is mainly used for inheritance, to instantiate a prime
without having to invoke its constructor. Uses the native `Object.create`
where available. Unless you have a very specific reason to use this, you should
use `prime` instead, and its `inherits` metamethod.

### Syntax

```js
prime.create(proto)
```

### Parameters

- proto - (*object*) The prototype of the instantiated empty constructor.
created object

### Returns

- (*object*) An instance of the empty constructor.

### Example

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

# es5/array

This module contains ECMAScript 5 array methods as generics.
Native JavaScript methods will always get invoked where available,
otherwise a compliant JavaScript substitute will be used.

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

`array` is a [shell](#util/shell).

## filter

Creates a new array with the elements of the original array for which the
provided filtering function returns true.

### Syntax

```js
var filteredArray = array.filter(myArray, fn[, context])
```

### Parameters

1. myArray - (*array*) The array to filter.
1. fn - (*function*) The function to test each element of the array. This
function is passed the item and its index in the array.
2. context - (*object*, optional) The object to use as 'this' in the function.

#### Parameter: fn

##### Syntax

```js
fn(item, index, array)
```

##### Arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### Returns

* (*array*) The new filtered array.

### Example

```js
var biggerThanTwenty = array.filter([10, 3, 25, 100], function(item, index){
    return item > 20
}) // biggerThanTwenty = [25, 100]
```

### See Also:

- [MDN Array:filter](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter)

## indexOf

Returns the index of the first element within the array equal to the specified
value, or -1 if the value is not found.

### Syntax

```js
var index = myArray.indexOf(item[, from])
```

### Returns

* (*number*) The index of the first element within the array equal to the
specified value. If not found, returns -1.

### Parameters

1. item - (*object*) The item to search for in the array.
2. from - (*number*, optional: defaults to 0) The index of the array at which
to begin the search.

### Examples

```js
array.indexOf(['apple', 'lemon', 'banana'], 'lemon') // returns 1
array.indexOf(['apple', 'lemon'], 'banana'); // returns -1
```

### See Also

- [MDN Array:indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf)

## map

Creates a new array with the results of calling a provided function on every
element in the array.

### Syntax

```js
var mappedArray = array.map(myArray, fn[, context])
```

### Parameters

1. myArray - (*array*) Original array to map
2. fn - (*function*) The function to produce an element of the new Array from
an element of the current one.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### Argument: fn

##### Syntax

```js
fn(item, index, array)
```

##### Arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### Returns

* (*array*) The new mapped array.

### Example

```js
var timesTwo = array.map([1, 2, 3], function(item, index){
    return item * 2
}) // timesTwo = [2, 4, 6]
```

### See Also

- [MDN Array:map](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map)

## forEach

Used to iterate through arrays, or iterables that are not regular arrays, such
as built in getElementsByTagName calls or arguments of a function.

### Syntax

```js
array.forEach(myArray, fn[, context])
```

### Parameters

1. myArray - (*array*) The array to iterate through.
2. fn - (*function*) The function to test for each element.
3. context - (*object*, optional) The object to use as 'this' within the
function.

#### Parameter: fn

##### Syntax

```js
fn(item, index, object)
```

##### Arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array. In the case of an
object, it is passed the key of that item rather than the index.
3. object - (*mixed*) The actual array/object.

### Example

```js
array.forEach(['Sun', 'Mon', 'Tue'], function(day, index){
    alert('name:' + day + ', index: ' + index)
}) // alerts 'name: Sun, index: 0', 'name: Mon, index: 1', etc.
```

### See Also:

- [MDN Array:forEach](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach)

## every

Returns true if every element in the array satisfies the provided testing
function.

### Syntax

```js
var allPassed = array.every(myArray, fn[, context])
```

### Parameters

1. myArray - (*array*) The array with the elements that should be checked.
2. fn - (*function*) The function to test for each element.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### Parameter: fn

##### Syntax

```js
fn(item, index, array)
```

##### Arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### Returns

* (*boolean*) If every element in the array satisfies the provided testing
function, returns true. Otherwise, returns false.

### Examples:

```js
var areAllBigEnough = array.every([10, 4, 25, 100], function(item, index){
    return item > 20
}) // areAllBigEnough = false
```

### See Also

- [MDN Array:every](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every)

## some

Returns true if at least one element in the array satisfies the provided
testing function.

### Syntax

```js
var somePassed = array.some(myArray, fn[, context])
```

### Parameters

1. myArray - (*array*) The array with the elements that should be checked.
2. fn - (*function*) The function to test for each element. This function is
passed the item and its index in the array.
3. context - (*object*, optional) The object to use as 'this' in the function.

#### Parameter: fn

##### Syntax

	fn(item, index, array)

##### Arguments

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### Returns

* (*boolean*) If some element in the array satisfies the provided testing
function, returns true. Otherwise, returns false.

### Examples

```js
var isAnyBigEnough = array.some([10, 4, 25, 100, function(item, index){
    return item > 20;
}); // isAnyBigEnough = true
```

### See Also

- [MDN Array:some](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some)

## isArray

Returns `true` if the object is an array, otherwise `false`.

### Syntax

```js
array.isArray(object)
```

### Parameters

1. object (*mixed*) The object to be checked if it's an array.

### Returns

* (*boolean*) `true` if the object is an array, otherwise it will return
`false`.

### Examples

```js
array.isArray([1, 2, 3]) // true for arrays
array.isArray('moo') // false for any other type
array.isArray({length: 1, 0: 'hi'}) // also false for array-like objects
```

### Note

- This function is a 'static' function, so not like other methods on this
[shell](#util/shell).

### See Also

- [MDN Array.isArray](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray)

# util/shell

A prime that mutates its implemented prototypes into methods that can be used as generics.
This special prime returns an object that inherits both prototypes and generics from its ancestor.
You should not probably bother with `shell` unless you have a very specific reason to do so.

### Syntax
```js
var shell = require('prime/util/shell')

var myShell = shell(methods)
```

### Parameters

1. methods - (*object*) An object containing methods.

### Returns

Returns a plain `[Object object]` whose `prototype` property is set to the passed methods.
Generics are also automatically generated for each of the passed in methods, and attached to the object.

### Example

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
