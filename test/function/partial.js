"use strict"

var expect = require("expect.js")
var partial = require("../../function/partial")

describe("function/partial", function(){

    function add3(x, y, z){
        return x + y + z
    }

    it("should partially apply add3", function(){
        var add = partial(add3, 10, 5)
        expect(add(20)).to.be(35)
    })

})
