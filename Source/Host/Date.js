/*
---
name: Date
description: ES5 Date methods
...
*/

define(['../Host'], function(Host){

"use strict";

return Host(Date).extend('now', function(){
	return +(new Date);
});

});
