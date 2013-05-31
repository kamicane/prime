"use strict";

var expect = require('expect.js')
var prime = require('../../index')
var forIn = require('../../object/forIn')

describe('prime.each', function(){

    var obj = {
        a: 'a',
        toString: function(){
            return 'toString'
        },
        valueOf: function(){
            return 'valueOf'
        }
    }

    var keys = []
    var values = []
    var objects = []
    var thisObjects = []

    var context = {b: 'b'}

    forIn(obj, function(value, key, object){
        values.push(value)
        keys.push(key)
        objects.push(object)
        thisObjects.push(this)
    }, context)

    it('should iterate over all object members', function(){
        expect(keys).to.eql(['a', 'toString', 'valueOf'])
        expect(values.length).to.be(3)
        expect(values[0]).to.be(obj.a)
        expect(values[1]).to.be(obj.toString)
        expect(values[2]).to.be(obj.valueOf)
    })

    it('should pass object as the third argument', function(){
        expect(objects.length).to.be(3)
        expect(objects[0]).to.be(obj)
        expect(objects[1]).to.be(obj)
        expect(objects[2]).to.be(obj)
    })

    it('should called with the object as context', function(){
        expect(thisObjects.length).to.be(3)
        expect(thisObjects[0]).to.be(context)
        expect(thisObjects[1]).to.be(context)
        expect(thisObjects[2]).to.be(context)
    })

})
