"use strict";

var expect = require('expect.js')
var date = require('../../date')

describe('es5/date', function(){

    describe('Date.now', function(){

        it('should return the current date timestamp', function(){
            expect(Math.round(new Date().getTime() / 1000)).to.eql(Math.round(date.now() / 1000))
        })

    })

})
