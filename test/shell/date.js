"use strict"

var expect = require('expect.js')
var date = require('../../date')

describe('shell/date', function(){

    it('should export the date shell', function(){
        expect(date != null).to.be.ok()
        expect(date.now()).to.be.a('number')
    })

})
