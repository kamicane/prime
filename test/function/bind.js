"use strict";

var expect = require("expect.js")
var bind = require("../../function/bind")

var rules = function(){
    return this + ' rules'
}

var args = function(){
    return [this].concat([].slice.call(arguments))
}

describe("function", function(){

    describe("bind", function(){

        it("should set the thisArg", function(){
            expect(bind(rules, "MooTools")()).to.be("MooTools rules")
        })

        it("should set the thisArg and some arguments", function(){
            var bound = bind(args, "MooTools", "rocks", "the house")
            expect(bound()).to.eql(["MooTools", "rocks", "the house"])
        })

        it("should set the thisArg and the passed arguments", function(){
            var bound = bind(args, "MooTools")
            var result = bound("rocks", "the house")
            expect(result).to.eql(["MooTools", "rocks", "the house"])
        })

        it("should set the thisArg, arguments and concat that with the passed arguments", function(){
            var bound = bind(args, "MooTools", "rocks", "the house")
            var result = bound("so", "bad")
            expect(result).to.eql(["MooTools", "rocks", "the house", "so", "bad"])
        })

    })

})

