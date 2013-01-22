"use strict"

var expect = require('expect.js')

var array = require('../../shell/array')

describe('array', function(){

    describe('set', function(){
        it('should set a value of the array', function(){
            var a = ['bar']
            expect(a[0]).to.be('bar')
            array.set(a, 0, 'foo')
            expect(a[0]).to.be('foo')
        })
    })

    describe('get', function(){
        it('should get an value from the array', function(){
            var a = ['bar', 'foo']
            expect(array.get(a, 1)).to.be('foo')
        })
        it('should return null if the key is not in the array', function(){
            var a = ['bar', 'foo']
            expect(array.get(a, 2)).to.be(null)
        })
    })

    describe('count', function(){
        it('should count the number of items in the array', function(){
            expect(array.count([1, 2, 3, 4])).to.be(4)
        })
        it('should return the number of items in an array-like object', function(){
            expect(array.count({length: 2, "0": 1, "1": 2})).to.be(2)
        })
    })

    describe('each', function(){
        it('should iterate through the array, and stop when the function returns false', function(){
            var values = [], keys = [], arrays = [], contexts = []
            var a = {length: 3, "0": 1, "1": 2, "2": 3}
            array.each(a, function(value, key, list){
                values.push(value)
                keys.push(key)
                arrays.push(list)
                contexts.push(this)
                if (key == 1) return false
            }, "context")
            expect(values).to.eql([1, 2])
            expect(keys).to.eql([0, 1])
            expect(arrays).to.eql([a, a])
            expect(contexts).to.eql(["context", "context"])
        })
    })

    describe('backwards', function(){
        it('should iterate backwards through the array, and stop when the function returns false', function(){
            var values = [], keys = [], arrays = [], contexts = []
            var a = {length: 3, "0": 1, "1": 2, "2": 3}
            array.backwards(a, function(value, key, list){
                values.push(value)
                keys.push(key)
                arrays.push(list)
                contexts.push(this)
                if (key == 1) return false
            }, "context")
            expect(values).to.eql([3, 2])
            expect(keys).to.eql([2, 1])
            expect(arrays).to.eql([a, a])
            expect(contexts).to.eql(["context", "context"])
        })
    })

    describe('index', function(){
        it('should get the index of a specific item in the array', function(){
            expect(array.index([1, 2, 3], 2)).to.be(1)
        })
        it('should return "null" if the item is not in the array', function(){
            expect(array.index([1, 2, 3], 5)).to.be(null)
        })
    })

    describe('remove', function(){
        it('should remove an item from the array', function(){
            var a = [1, 2, 3, 4]
            var ret = array.remove(a, 2)
            expect(a).to.eql([1, 2, 4])
            expect(ret).to.be(3)
        })
    })

})
