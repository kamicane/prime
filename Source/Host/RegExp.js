/*
---
name: RegExp
description: ES5 RegExp methods
...
*/

define(['../Core/Host'], function(Host){

var proto = RegExp.prototype;
return Host(RegExp).implement({exec: proto.exec, test: proto.test});

});
