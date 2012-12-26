/*
date
 - date shell
*/"use strict"

var shell = require("../shell/")

module.exports = shell({
    inherits: require("../es5/date")
})
