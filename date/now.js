/*
date:now
*/"use strict"

var now = Date.now || function(){
    return new Date().getTime()
}

module.exports = now
