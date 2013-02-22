/*global mocha:true mochaPhantomJS:true */
/*jshint browser:true */
"use strict";

mocha.setup('bdd')

require("./es5/array")
require("./es5/date")
require("./es5/function")
require("./es5/number")
require("./es5/object")
require("./es5/regexp")
require("./es5/string")

require("./prime/each")
require("./prime/index")

require("./shell/array")
require("./shell/date")
require("./shell/function")
require("./shell/number")
require("./shell/object")
require("./shell/regexp")
require("./shell/string")
require("./shell/index")

require("./util/emitter")
require("./util/map")
require("./util/type")

window.onload = function(){
    if (window.mochaPhantomJS) mochaPhantomJS.run()
    else mocha.run()
}
