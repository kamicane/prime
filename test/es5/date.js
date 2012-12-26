"use strict";

var expect = require('expect.js')
var date = require('../../es5/date')

describe('es5/date', function(){

    describe('Date.now', function(){

        it('should return the current date timestamp', function(){
            expect(new Date().getTime()).to.eql(date.now())
        })

    })

})
