/*
---
name: String
description: ES5 String methods
...
*/

define(['../Host'], function(Host){

var names = 'charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase'.split(','),
	i = names.length, String_ = Host(String), proto = String.prototype;

while (i--) String_.implement(names[i], proto[names[i]]);

String_.implement('trim', function(){
	return (this + '').replace(/^\s+|\s+$/g, '');
});

return String_;

});
