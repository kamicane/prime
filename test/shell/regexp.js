"use strict"

var expect = require('expect.js')
var regexp = require('../../regexp')

describe('shell/regexp', function(){

    it('should export the regexp shell', function(){
        expect(regexp != null).to.be.ok()
        expect(regexp.test(/a/, 'a')).to.be.ok()
        expect(regexp.exec(/a/, 'a').join()).to.eql('a')
    })

})
