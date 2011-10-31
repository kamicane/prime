/*
---
name: Number
description: ES5 Number methods
...
*/

define(['../Host'], function(Host){

"use strict";

var proto = Number.prototype;
return Host(Number).implement({
	toExponential: proto.toExponential, toFixed: proto.toFixed, toLocaleString: proto.toLocaleString, toPrecision: proto.toPrecision
});

});
