/*
---
name: Array
description: Custom Array prototypes and generics.
...
*/

define(['../Core/Host', '../Host/Array'], function(Host, Array){
	
Array = Host(Array).implement({

	invoke: function(name){
		var args = Array.slice(arguments, 1), results = [];
		for (var i = 0, j = this.length; i < j; i++){
			var item = this[i];
			results.push(item[name].apply(item, args));
		}
		return results;
	},

	append: function(array){
		this.push.apply(this, array);
		return this;
	},

	contains: function(item, from){
		return Array.indexOf(this, item, from) != -1;
	},

	last: function(){
		var length = this.length;
		return (length) ? this[length - 1] : null;
	},

	random: function(){
		var length = this.length;
		return (length) ? this[Math.floor(Math.random() * length)] : null;
	},

	include: function(item){
		if (!Array.contains(this, item)) this.push(item);
		return this;
	},

	erase: function(item){
		for (var i = this.length; i--; i){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	item: function(at){
		var length = this.length;
		if (at < 0) at = (at % length) + length;
		return (at < 0 || at >= length || this[at] == null) ? null : this[at];
	}

});

return Array;
	
});
