"use strict"

var expect = require('expect.js')
var string = require('../../string')

describe('string', function(){

    describe('trim', function(){

        it('should trim left and right whitespace from the string', function(){
            expect(string.trim('  i like cookies  ')).to.equal('i like cookies')
            expect(string.trim('  i  \tlike  cookies  ')).to.equal('i  \tlike  cookies')
        })

        it('should return the trimmed value of the returned value of the toString method', function(){
            expect(string.trim({
                toString: function(){ return '  i like cookies  ' }
            })).to.equal('i like cookies')
        });

    })

    it('should implement native string methods', function(){
        expect(string.charCodeAt(';', 0)).to.be(59)
        expect(string.toUpperCase('Mannschaft')).to.equal('MANNSCHAFT')
    })

});
