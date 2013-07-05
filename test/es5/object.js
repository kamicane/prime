"use strict"

var expect = require('expect.js')
var object = require('../../object')

describe('es5/object', function(){

    it('should have exported a value', function(){
        expect(object != null).to.be.ok()
    })

    it('should implement existing methods in the shell', function(){
        expect(object.hasOwnProperty).to.be.ok()
        expect(object.hasOwnProperty != Object.prototype.hasOwnProperty).to.be.ok()
        expect(object.toString([])).to.be('[object Array]')
    })

})
