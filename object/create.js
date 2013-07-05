/*
object:create
*/"use strict"

var create = function(self){
    var constructor = function(){}
    constructor.prototype = self
    return new constructor
}

module.exports = create
