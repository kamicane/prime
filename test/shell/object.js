"use strict"

var expect = require('expect.js')

var hash = require('../../object')

describe('hash', function(){

    // describe('set', function(){
    //     it('should set a value of the object', function(){
    //         var object = {}
    //         expect(object.name).to.be(undefined)
    //         hash.set(object, 'name', 'John')
    //         expect(object.name).to.be('John')
    //     })
    // })

    // describe('get', function(){
    //     it('should get an value from the object', function(){
    //         var object = {name: 'John'}
    //         expect(hash.get(object, 'name')).to.be('John')
    //     })
    //     it('should return null if the property does not exist', function(){
    //         var object = {name: 'John'}
    //         expect(hash.get(object, 'firstName')).to.be(null)
    //     })
    // })

    // describe('count', function(){
    //     it('should count the number of items in the object', function(){
    //         var object = {a: 1, b: 2, c: 3}
    //         expect(hash.count(object)).to.be(3)
    //     })
    // })

    describe('each', function(){
        it('should iterate through the object, and stop when the function returns false', function(){
            var object = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
            var values = [], keys = [], objects = [], contexts = []
            hash.forIn(object, function(value, key, obj){
                values.push(value)
                keys.push(key)
                objects.push(obj)
                contexts.push(this)
                if (key == 'd') return false
            }, "context")
            expect(values).to.eql([1, 2, 3, 4])
            expect(keys).to.eql(['a', 'b', 'c', 'd'])
            expect(objects).to.eql([object, object, object, object])
            expect(contexts).to.eql(["context", "context", "context", "context"])
        })
    })

    describe('map', function(){
        it('should map the values of an object into a new object', function(){
            var object = {a: 1, b: 2, c: 3}, ctx = {}
            var contexts = [], objects = []
            var mapped = hash.map(object, function(val, key, obj){
                objects.push(obj)
                contexts.push(this)
                return key.charCodeAt(0) + val
            }, ctx)
            expect(objects).to.eql([object, object, object])
            expect(contexts).to.eql([ctx, ctx, ctx])
            expect(mapped).to.eql({a: 98, b: 100, c: 102})
            expect(mapped === object).not.to.be.ok()
        })
    })

    describe('filter', function(){
        it('should filter values from an object, and return a new object', function(){
            var object = {a: 1, b: 2, c: 3}, ctx = {}
            var contexts = [], objects = []
            var filtered = hash.filter(object, function(val, key, obj){
                objects.push(obj)
                contexts.push(this)
                return key.charCodeAt(0) > 97
            }, ctx)
            expect(objects).to.eql([object, object, object])
            expect(contexts).to.eql([ctx, ctx, ctx])
            expect(filtered).to.eql({b: 2, c: 3})
            expect(filtered === object).not.to.be.ok()
        })
    })

    describe('every', function(){
        it('should return true if the function returns true for every value in the object', function(){
            var object = {a: 1, b: 2, c: 3}, ctx = {}
            var contexts = [], objects = []
            var every = hash.every(object, function(val, key, obj){
                objects.push(obj)
                contexts.push(this)
                return key.charCodeAt(0) + val > 97
            }, ctx)
            expect(objects).to.eql([object, object, object])
            expect(contexts).to.eql([ctx, ctx, ctx])
            expect(every).to.equal(true)
        })
        it('should return false if the function does not returns true for every value in the object', function(){
            var object = {a: 1, b: 2, c: 3}
            var every = hash.every(object, function(val, key, obj){
                return key.charCodeAt(0) > 97
            })
            expect(every).to.equal(false)
        })
    })

    describe('some', function(){
        it('should return true if the function returns true for some value in the object', function(){
            var object = {a: 1, b: 2, c: 3}, ctx = {}
            var contexts = [], objects = []
            var some = hash.some(object, function(val, key, obj){
                objects.push(obj)
                contexts.push(this)
                return key.charCodeAt(0) + val >= 100
            }, ctx)
            expect(objects).to.eql([object, object])
            expect(contexts).to.eql([ctx, ctx])
            expect(some).to.equal(true)
        })
        it('should return false if the function does not returns true for any value in the object', function(){
            var object = {a: 1, b: 2, c: 3}
            var some = hash.some(object, function(val, key, obj){
                return key.charCodeAt(0) > 200
            })
            expect(some).to.equal(false)
        })
    })

    describe('index', function(){
        it('should get the index of a specific item in the object', function(){
            expect(hash.indexOf({a: 1, b: 2, c: 3}, 2)).to.be('b')
        })
        it('should return null if the item is not in the object', function(){
            expect(hash.indexOf({a: 1, b: 2, c: 3}, 5)).to.be(null)
        })
    })

    describe('remove', function(){
        it('should remove an item from the object and return the key', function(){
            var object = {name: 'John'}
            expect(object.name).to.be('John')
            var ret = hash.remove(object, 'John')
            expect(object.name).to.be(undefined)
            expect(ret).to.be('name')
        })
    })

    describe('keys', function(){
        it('should return an array with the keys of the object', function(){
            expect(hash.keys({a: 1, b: 2, c: 3, d: 4})).to.eql(['a', 'b', 'c', 'd'])
        })
    })

    describe('values', function(){
        it('should return an array with the values of the object', function(){
            expect(hash.values({a: 1, b: 2, c: 3, d: 4})).to.eql([1, 2, 3, 4])
        })
    })

})
