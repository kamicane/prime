"use strict"

var expect = require('expect.js')

var Map = require('../map')

describe('map', function(){

    // https://github.com/visionmedia/mocha/issues/502#issuecomment-7317552
    beforeEach(function(done){
        setTimeout(done, 0)
    })

    describe('set / get', function(){

        it('should set and get a value from the map', function(){
            var map = new Map()
            var object = {}
            map.set(object, 'bar')
            map.set('bar', object)
            expect(map.get(object)).to.be('bar')
            expect(map.get('bar')).to.be(object)
        })

        it('should overwrite a value', function(){
            var map = new Map()
            map.set('bar', 'foo')
            expect(map.get('bar')).to.be('foo')
            map.set('bar', 'wop')
            expect(map.get('bar')).to.be('wop')
        })

    })

    describe('count', function(){
        it('should count the number of values in the map', function(){
            var map = new Map()
            map.set('bar', 'foo').set('foo', 'bar')
            expect(map.count()).to.be(2)
        })
    })

    describe('each', function(){
        it('Iterates over a map instance, and stop when false is returned', function(){
            var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}
            map.set('bar', 'foo').set('foo', 'bar').set('b', 1)
            map.forEach(function(val, key, mp){
                keys.push(key)
                values.push(val)
                ctxs.push(this)
                maps.push(mp)
                if (key == 'foo') return false
            }, ctx)
            expect(keys).to.eql(['bar', 'foo'])
            expect(values).to.eql(['foo', 'bar'])
            expect(ctxs).to.eql([ctx, ctx])
            expect(maps).to.eql([map, map])
        })
    })

    // describe('backwards', function(){
    //     it('Iterates over a map instance backwards, and stop when false is returned', function(){
    //         var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}
    //         map.set('bar', 'foo').set('foo', 'bar').set('b', 1)
    //         map.backwards(function(val, key, mp){
    //             keys.push(key)
    //             values.push(val)
    //             ctxs.push(this)
    //             maps.push(mp)
    //             if (key == 'foo') return false
    //         }, ctx)
    //         expect(keys).to.eql(['b', 'foo'])
    //         expect(values).to.eql([1, 'bar'])
    //         expect(ctxs).to.eql([ctx, ctx])
    //         expect(maps).to.eql([map, map])
    //     })
    // })

    describe('map', function(){
        it('map the values in the map', function(){
            var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}
            map.set('bar', 'foo').set('foo', 'bar').set('b', 1)
            var result = map.map(function(val, key, mp){
                keys.push(key)
                values.push(val)
                ctxs.push(this)
                maps.push(mp)
                return key
            }, ctx)
            expect(keys).to.eql(['bar', 'foo', 'b'])
            expect(values).to.eql(['foo', 'bar', 1])
            expect(ctxs).to.eql([ctx, ctx, ctx])
            expect(maps).to.eql([map, map, map])
            expect(result === map).not.to.be.ok()
            expect(result.get('bar')).to.be('bar')
            expect(result.get('foo')).to.be('foo')
        })
    })

    describe('filter', function(){
        it('filter the values in the map', function(){
            var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}, a = {}, b = {}
            map.set('bar', a).set('foo', b).set('b', 1)
            var result = map.filter(function(val, key, mp){
                keys.push(key)
                values.push(val)
                ctxs.push(this)
                maps.push(mp)
                return typeof val == 'object'
            }, ctx)
            expect(keys).to.eql(['bar', 'foo', 'b'])
            expect(values).to.eql([a, b, 1])
            expect(ctxs).to.eql([ctx, ctx, ctx])
            expect(maps).to.eql([map, map, map])
            expect(result === map).not.to.be.ok()
            expect(result.get('bar')).to.be(a)
            expect(result.get('foo')).to.be(b)
            expect(result.get('b')).to.be(null)
        })
    })

    describe('every', function(){
        it('return true if every value is ok', function(){
            var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}
            map.set('bar', 2).set('foo', 0).set('b', 1)
            var result = map.every(function(val, key, mp){
                keys.push(key)
                values.push(val)
                ctxs.push(this)
                maps.push(mp)
                return val < 5
            }, ctx)
            expect(keys).to.eql(['bar', 'foo', 'b'])
            expect(values).to.eql([2, 0, 1])
            expect(ctxs).to.eql([ctx, ctx, ctx])
            expect(maps).to.eql([map, map, map])
            expect(result).to.be(true)
        })
        it('should return false if not true is returned for each value', function(){
            var map = new Map()
            map.set('bar', 2).set('foo', 0).set('b', 1)
            var result = map.every(function(val, key, mp){
                return val < 1
            })
            expect(result).to.be(false)
        })
    })

    describe('some', function(){
        it('return false if every value is not ok', function(){
            var map = new Map(), keys = [], values = [], ctxs = [], maps = [], ctx = {}
            map.set('bar', 2).set('foo', 0).set('b', 1)
            var result = map.some(function(val, key, mp){
                keys.push(key)
                values.push(val)
                ctxs.push(this)
                maps.push(mp)
                return val > 5
            }, ctx)
            expect(keys).to.eql(['bar', 'foo', 'b'])
            expect(values).to.eql([2, 0, 1])
            expect(ctxs).to.eql([ctx, ctx, ctx])
            expect(maps).to.eql([map, map, map])
            expect(result).to.be(false)
        })
        it('should return true if true is returned for some value', function(){
            var map = new Map()
            map.set('bar', 2).set('foo', 0).set('b', 1)
            var result = map.some(function(val, key, mp){
                return val < 1
            })
            expect(result).to.be(true)
        })
    })

    describe('index', function(){
        it('should return the key which is assiciated with a value', function(){
            var map = new Map(), obj = {}
            map.set('bar', 2).set(obj, 0).set('moo', 0).set('b', 1)
            expect(map.indexOf(0)).to.be(obj)
        })
    })

    describe('remove', function(){
        it('should remove a value and return the key', function(){
            var map = new Map(), obj1 = {}, obj2 = {}
            map.set('bar', 2).set(obj1, obj2).set('moo', 0).set('b', 1)
            expect(map.remove(obj2)).to.be(obj1)
            expect(map.remove(obj2)).to.be(null)
        })
    })

    describe('keys', function(){
        it('should return an array with the keys of the map', function(){
            var map = new Map(), obj = {}
            map.set('bar', 2).set(obj, 0).set('moo', 0).set('b', 1)
            expect(map.keys()).to.eql(['bar', obj, 'moo', 'b'])
        })
    })
    describe('get', function(){
        it('should return an array with the values of the map', function(){
            var map = new Map(), obj = {}
            map.set('bar', 2).set(obj, 0).set('moo', 0).set('b', 1)
            expect(map.values()).to.eql([2, 0, 0, 1])
        })
    })

    // describe('toString', function(){
    //     it('should return [object Map]', function(){
    //         expect((new Map()) + '').to.equal('[object Map]')
    //     })
    // })

})
