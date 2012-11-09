"use strict"

var expect = require('expect.js')
var number = require('../../types/number')

describe('types/number', function(){

    describe('limit', function(){
        it('should limit numbers', function(){
            expect(number.limit(1, 3, 8)).to.be(3)
            expect(number.limit(5, 3, 8)).to.be(5)
            expect(number.limit(9, 3, 8)).to.be(8)
        })
    })

    describe('round', function(){
        it('should round numbers', function(){
            expect(number.round(3.14)).to.be(3)
            expect(number.round(3.74)).to.be(4)
            expect(number.round(3.74, 1)).to.be(3.7)
            expect(number.round(3.75, 1)).to.be(3.8)
        })
    })

    describe('times', function(){
        it('should call a function n times', function(){
            var buffer1 = [], buffer2 = [], buffer3 = [], buffer4 = []
            number.times(5, function(i, j, k){
                buffer1.push(i)
                buffer2.push(j)
                buffer3.push(k)
                buffer4.push(this)
            }, 1)
            expect(buffer1).to.eql([0, 1, 2, 3, 4])
            expect(buffer2).to.eql([null, null, null, null, null])
            expect(buffer3).to.eql([5, 5, 5, 5, 5])
            expect(buffer4).to.eql([1, 1, 1, 1, 1])
        })
    })

    describe('random', function(){
        it('should create a random number', function(){
            for (var i = 0; i < 100; i++){
                var min = 50 - 1, max = 51 + i
                var random = number.random(min, max)
                expect(random >= min && random <= max).to.be.ok()
            }
        })
    })

})
