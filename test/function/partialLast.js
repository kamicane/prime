"use strict"

var expect = require("expect.js")
var partialLast = require("../../function/partialLast")
var filter = require("../../array/filter")
var map = require("../../array/map")

describe("function/partialLast", function(){

    function even(x){
        return x % 2 != 1
    }

    function multByThis(x){
        return x * Number(this)
    }

    it("should partially apply the last arguments", function(){
        var data = [-6, 1, 2, 3, 4, 5]
        var filterEven = partialLast(filter, even)
        var evenNumbers = filterEven(data)
        expect(evenNumbers).to.eql([-6, 2, 4])
    })

    it("should partially apply the last two arguments", function(){
        var data = [-1, 1, 2, 3, 4, 5]
        var multiplyWith10 = partialLast(map, multByThis, 10)
        var multiplied = multiplyWith10(data)
        expect(multiplied).to.eql([-10, 10, 20, 30, 40, 50])
    })

})
