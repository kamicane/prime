/*
---
name: RegExp
description: ES5 RegExp methods
...
*/

define(['../Host'], function(Host){

"use strict";

var proto = RegExp.prototype;
return Host(RegExp).implement({exec: proto.exec, test: proto.test});

});
