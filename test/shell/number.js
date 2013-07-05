"use strict"

var expect = require('expect.js')
var number = require('../../number')

describe('types/number', function(){

    describe('limit', function(){
        it('should limit numbers', function(){
            expect(number.limit(1, 3, 8)).to.be(3)
            expect(number.limit(5, 3, 8)).to.be(5)
            expect(number.limit(9, 3, 8)).to.be(8)
        })
    })

    describe('round', function(){
        it('should round numbers if no precision is specified', function(){
            expect(number.round(3.14)).to.be(3)
        })

        it('should round numbers according to the units place specified', function(){
            expect(number.round(0.01, 2)).to.equal(0.01)
            expect(number.round(1, 3)).to.equal(1)
            expect(number.round(-1.01)).to.equal(-1)
            expect(number.round(-1.01, 2)).to.equal(-1.01)
            expect(number.round(111, -1)).to.equal(110)
            expect(number.round(-111, -2)).to.equal(-100)
            expect(number.round(100, -5)).to.equal(0)
        })
    })

    describe('times', function(){
        it('should call a function n times', function(){
            var buffer1 = [], buffer2 = [], buffer3 = [], buffer4 = []
            number.times(5, function(i, j, k){
                buffer1.push(i)
                buffer2.push(j)
                buffer3.push(+k)
                buffer4.push(this)
            }, 1)
            expect(buffer1).to.eql([0, 1, 2, 3, 4])
            expect(buffer2).to.eql([null, null, null, null, null])
            expect(buffer3).to.eql([5, 5, 5, 5, 5])
            expect(buffer4).to.eql([1, 1, 1, 1, 1])
        })
        it('should not call the function if the number is 0', function(){
            var n = 0
            number.times(0, function(){
                n++
            })
            expect(n).to.be(0)
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
        it('should return the same number if the min and max are equal', function(){
            expect(number.random(20, 20)).to.be(20)
        })
    })

})
