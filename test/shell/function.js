"use strict"

var expect = require('expect.js')
var fn = require('../../function')

describe('shell/function', function(){

    it('should export the function shell', function(){
        expect(fn != null).to.be.ok()
        expect(fn.apply(function(){
            return 1
        })).to.be.a('number')
    })

})
