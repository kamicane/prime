"use strict"

var expect = require('expect.js')

var list = require('../../shell/array')

describe('list', function(){

    describe('set', function(){
        it('should set a value of the array', function(){
            var array = ['bar']
            expect(array[0]).to.be('bar')
            list.set(array, 0, 'foo')
            expect(array[0]).to.be('foo')
        })
    })

    describe('get', function(){
        it('should get an value from the array', function(){
            var array = ['bar', 'foo']
            expect(list.get(array, 1)).to.be('foo')
        })
        it('should return null if the key is not in the array', function(){
            var array = ['bar', 'foo']
            expect(list.get(array, 2)).to.be(null)
        })
    })

    describe('count', function(){
        it('should count the number of items in the array', function(){
            expect(list.count([1, 2, 3, 4])).to.be(4)
        })
        it('should return the number of items in an array-like object', function(){
            expect(list.count({length: 2, "0": 1, "1": 2})).to.be(2)
        })
    })

    describe('each', function(){
        it('should iterate through the array, and stop when the function returns false', function(){
            var values = [], keys = [], lists = [], contexts = []
            var array = {length: 3, "0": 1, "1": 2, "2": 3}
            list.each(array, function(value, key, list){
                values.push(value)
                keys.push(key)
                lists.push(list)
                contexts.push(this)
                if (key == 1) return false
            }, "context")
            expect(values).to.eql([1, 2])
            expect(keys).to.eql([0, 1])
            expect(lists).to.eql([array, array])
            expect(contexts).to.eql(["context", "context"])
        })
    })

    describe('index', function(){
        it('should get the index of a specific item in the list', function(){
            expect(list.index([1, 2, 3], 2)).to.be(1)
        })
        it('should return null if the item is not in the list', function(){
            expect(list.index([1, 2, 3], 5)).to.be(null)
        })
    })

    describe('remove', function(){
        it('should remove an item from the list', function(){
            var array = [1, 2, 3, 4]
            var ret = list.remove(array, 2)
            expect(array).to.eql([1, 2, 4])
            expect(ret).to.be(3)
        })
    })

})
