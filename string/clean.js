/*
string:clean
*/"use strict"

var trim = require("./trim")

clean: function(self){
    return trim((self + "").replace(/\s+/g, " "))
}

module.exports = clean
