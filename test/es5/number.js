"use strict"

var expect = require('expect.js')
var number = require('../../number')

describe('number', function(){

    it('should have implemented Number methods', function(){
        expect(number.toExponential(1000)).to.equal('1e+3')
        expect(number.toFixed(3.14159, 2)).to.equal('3.14')
        expect(number.toPrecision(3.14159, 2)).to.equal('3.1')
    })

})
