/*
---
name: Number
description: ES5 Number methods
...
*/

define(['../Core/Host'], function(Host){

var proto = Number.prototype;
return Host(Number).implement({
	toExponential: proto.toExponential, toFixed: proto.toFixed, toLocaleString: proto.toLocaleString, toPrecision: proto.toPrecision
});

});
