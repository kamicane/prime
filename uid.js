/*
uid
*/"use strict"

var UID = 0

module.exports = function(){
    return (UID++).toString(36)
}
