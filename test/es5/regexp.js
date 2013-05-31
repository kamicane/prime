"use strict"

var expect = require('expect.js')
var regexp = require('../../regexp')

describe('regexp', function(){

    it('should implement native regexp methods', function(){
        expect(regexp.test(/a/, 'a')).to.be.ok()
        expect(regexp.exec(/a/, 'a').join()).to.eql('a')
    })

})
