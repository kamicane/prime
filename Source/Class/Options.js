/*
---
name: Options
description: Options
...
*/

define(['../Utility/typeOf', '../Utility/merge', '../Utility/Function', '../Core/Class'], function(typeOf, merge, Function, Class){

var classSetOption = function(key, value){
	if (!this.options) this.options = {};
	if (this.listen && (/^on[A-Z]/).test(key) && typeOf(value) == 'function') this.listen(key.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	}), value);
	else merge(this.options, key, value);
	return this;
};

var classGetOption = function(key){
	var options = this.options;
	if (!options) return null;
	var value = options[key];
	return (value != null) ? value : null;
};

return new Class({
	setOption: classSetOption,
	setOptions: Function.overloadSetter(classSetOption, true),
	getOption: classGetOption,
	getOptions: Function.overloadGetter(classGetOption, true)
});

});
