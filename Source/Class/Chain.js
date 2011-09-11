/*
---
name: Chain
description: Chain
...
*/

define(['../Core/Class'], function(Class){

return new Class({

	chain: function(fn){
		if (!this._chain) this._chain = [];
		this._chain.push(fn);
		return this;
	},

	callChain: function(){
		return (this._chain && this._chain.length) ? this._chain.shift().apply(this, arguments) : null;
	},

	clearChain: function(){
		delete this._chain;
		return this;
	}

});

});
