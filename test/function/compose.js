"use strict";

var expect = require('expect.js')
var compose = require('../../function/compose')

describe("function/compose", function(){

    function f(x){
        return x + 3
    }

    function g(x){
        return x * 2
    }

    function k(x){
        return Math.pow(x, 2)
    }

    it('should return identity when no functions are composed', function(){
        var h = compose()
        expect(h(10)).to.be(10)
    })

    it('should return the same function when composing only one function', function(){
        var h = compose(f)
        expect(h(3)).to.be(6)
    })

    it('should compose two functions f and g to f(g(x))', function(){
        var h = compose(f, g)
        expect(h(4)).to.be(11)
    })

    it('should h = f ∘ g ∘ k', function(){
        var h = compose(f, g, k)
        expect(h(4)).to.be(35)
    })

});
