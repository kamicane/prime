"use strict";

var expect = require('expect.js')
var array = require('../../array')

describe('es5/array', function(){

    function getTestArray(){
        var arr = [0, 1, 2, 3]
        delete arr[1]
        delete arr[2]
        return arr
    }

    function isNumber(value){
        return typeof value == 'number'
    }

    describe('Array.filter', function(){

        it('should filter an array', function(){
            var arr = [1,2,3,0,0,0]
            var testArr = array.filter(arr.concat([false, null, 4]), isNumber)
            expect(testArr).to.eql(arr.concat(4))
        })

        it('filter should not skip deleted elements', function(){
            var i = 0

            array.filter(getTestArray(), function(){
                i++
                return true
            })

            expect(i).to.equal(4)
        })

        it('should return the original item, and not any mutations.', function(){

            var result = array.filter([0, 1, 2], function(num, i, array){
                if (num == 1){
                    array[i] = 'mutation'
                    return true
                }
            })

            expect(result[0]).to.equal(1)
        })

    })

    describe('Array.indexOf', function(){

        it('should return the index of the item', function(){
            expect(array.indexOf([1,2,3,0,0,0], 0)).to.equal(3)
        })

        it('should return -1 if the item is not found in the array', function(){
            expect(array.indexOf([1,2,3,0,0,0], 'not found')).to.equal(-1)
        })

        it('should not return -1 for undefined when the array is sparse', function(){
            expect(array.indexOf(new Array(4), undefined)).to.equal(0)
        })

    })

    describe('Array.map', function(){

        it('should return a mapping of an array', function(){
            var arr = array.map([1,2,3,0,0,0], function(item){
                return (item + 1)
            })

            expect(arr).to.eql([2,3,4,1,1,1])
        })

        it('should not skip deleted elements', function(){
            var i = 0
            array.map(getTestArray(), function(){
                return i++
            })

            expect(i).to.equal(4)
        })

        it('should return an array with the same length', function(){
            expect(array.map([1, 2, 3, undefined], function(v){
                return v
            }).length).to.equal(4);
        })

        it('shoud return an empty array when the thisArg does not has a length property', function(){
            expect(array.map({}, function(){
                return 1
            })).to.eql([])
        })

    })

    describe('Array.forEach', function(){

        it('should call the function for each item in Function arguments', function(){
            var daysArr = []
            !function(){
                array.forEach(arguments, function(value, key){
                    daysArr[key] = value
                })
            }('Sun','Mon','Tue')

            expect(daysArr).to.eql(['Sun','Mon','Tue'])
        })

        it('should call the function for each item in the array', function(){
            var daysArr = []
            array.forEach(['Sun','Mon','Tue'], function(value, i){
                daysArr.push(value)
            })

            expect(daysArr).to.eql(['Sun','Mon','Tue'])
        })

        it('should iterate over deleted elements', function(){
            var arr = [0, 1, 2, 3],
                testArray = []
            delete arr[1]
            delete arr[2]

            array.forEach(arr, function(value){
                testArray.push(value)
            })

            expect(testArray).to.eql([0, undefined, undefined, 3])
        })

    })

    describe('Array.every', function(){

        it('should return true if every item matches the comparator, otherwise false', function(){
            expect(array.every([1,2,3,0,0,0], isNumber)).to.be(true)
            expect(array.every(['1',2,3,0], isNumber)).to.be(false)
        })

        it('should not skip deleted elements', function(){
            var i = 0
            array.every(getTestArray(), function(){
                i++
                return true
            })

            expect(i).to.equal(4)
        })

    })

    describe('Array.some', function(){

        it('should return true if some of the items in the array match the comparator, otherwise false', function(){
            expect(array.some(['1',2,3,0], isNumber)).to.be(true)

            var arr = array.map([1,2,3,0,0,0], String)
            expect(array.some(arr, isNumber)).to.be(false)
        })

        it('should not skip deleted elements', function(){
            var i = 0
            var a = getTestArray()
            delete a[0]

            array.some(a, function(value, index){
                i = index
                return true
            })

            expect(i).to.equal(0)
        })

    })

    it('should accept thisArgs without length property', function(){
        var object = {}, fn = function(){}
        expect(array.every(object, fn)).to.be(true)
        expect(array.filter(object, fn)).to.eql([])
        expect(array.indexOf(object)).to.equal(-1)
        expect(array.map(object, fn)).to.eql([])
        expect(array.some(object, fn)).to.be(false)
    })

    // describe('Array.isArray', function(){

    //     it('should test if a value is an Array', function(){
    //         expect(array.isArray([])).to.be(true)
    //         expect(array.isArray(new Array())).to.be(true)
    //         expect(array.isArray(Array())).to.be(true)
    //         expect(array.isArray('abc'.match(/(a)*/g))).to.be(true)
    //         expect((function(){ return array.isArray(arguments) })()).to.be(false)
    //         expect(array.isArray()).to.be(false)
    //         expect(array.isArray(null)).to.be(false)
    //         expect(array.isArray(undefined)).to.be(false)
    //         expect(array.isArray(true)).to.be(false)
    //         expect(array.isArray(false)).to.be(false)
    //         expect(array.isArray('a string')).to.be(false)
    //         expect(array.isArray({})).to.be(false)
    //         expect(array.isArray({length: 5})).to.be(false)
    //         expect(array.isArray({__proto__: Array.prototype, length:1, 0:1, 1:2})).to.be(false)
    //     })

    // })

})
