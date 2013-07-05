"use strict"

var expect = require('expect.js')
var string = require('../../string')

describe('types/string', function(){

    describe('clean', function(){
        it('should clean all extraneous whitespace from the string', function(){
            expect(string.clean('  i     like    cookies   ')).to.equal("i like cookies")
            expect(string.clean('  i\nlike \n cookies \n\t  ')).to.equal("i like cookies")
        })
    })

    describe('camelize', function(){
        it('should convert a hyphenated string into a camel cased string', function(){
            expect(string.camelize('i-like-cookies')).to.equal('iLikeCookies')
            expect(string.camelize('I-Like-Cookies')).to.equal('ILikeCookies')
        })
    })

    describe('hyphenate', function(){
        it('should convert a camel cased string into a hyphenated string', function(){
            expect(string.hyphenate('iLikeCookies')).to.equal('i-like-cookies')
            expect(string.hyphenate('ILikeCookies')).to.equal('-i-like-cookies')
        })
    })

    describe('capitalize', function(){
        it('should capitalize each word', function(){
            expect(string.capitalize('i like cookies')).to.equal('I Like Cookies')
            expect(string.capitalize('I Like cOOKIES')).to.equal('I Like COOKIES')
        })
    })

    describe('escape', function(){
        it('should escape regex characters so it can be used in a regex', function(){
            var original = "a./*[](){}$^+-_\\|"
            var escaped = string.escape(original)
            expect(escaped).to.equal('a\\.\\/\\*\\[\\]\\(\\)\\{\\}\\$\\^\\+\\-_\\\\\\|')
            expect(function(){
                new RegExp(escaped)
            }).not.to.throwException()
        })
    })

    // describe('number', function(){
    //     it('should parse a string to a number', function(){
    //         expect(string.number('10.11')).to.equal(10.11)
    //         expect(string.number('10.55px')).to.equal(10.55)
    //         expect(string.number('6.28deg')).to.equal(6.28)
    //     })
    // })

})
