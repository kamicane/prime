/*
---
name: String
description: custom String prototypes and generics.
...
*/

define(['../Core/Host', '../Host/String'], function(Host, String){
	
return Host(String).implement({

	contains: function(string, separator){
		return ((separator) ? (separator + this + separator).indexOf(separator + string + separator) : (this + '').indexOf(string)) > -1;
	},

	clean: function(){
		return String.trim((this + '').replace(/\s+/g, ' '));
	},

	camelCase: function(){
		return (this + '').replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	hyphenate: function(){
		return (this + '').replace(/[A-Z]/g, function(match){
			return '-' + match.toLowerCase();
		});
	},

	capitalize: function(){
		return (this + '').replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	}

});

});
