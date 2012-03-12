/*
JSON
*/

/*(es5 && json)?*/

if (typeof JSON === 'undefined'){
	
	var JSON = {}

	var array = require("./array"),
		type = require("../util/type")

	var special = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'}

	var escape = function(chr){
		return special[chr] || '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
	}

	var validate = function(string){
		string = string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
						replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
						replace(/(?:^|:|,)(?:\s*\[)+/g, '')

		return (/^[\],:{}\s]*$/).test(string)
	}

	JSON.stringify = function(obj){
		if (obj && obj.toJSON) obj = obj.toJSON()

		switch (type(obj)){
			case 'string':
				return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"'
			case 'array':
				return '[' + array.filter(array.map(obj, JSON.stringify), function(item){
					return item != null
				}) + ']'
			case 'object':
				var string = []
				for (var key in obj){
					var json = JSON.stringify(obj[key])
					if (json) string.push(JSON.stringify(key) + ':' + json)
				}
				return '{' + string + '}'
			case 'number': case 'boolean': return '' + obj
			case 'none': return 'null'
		}

		return null
	}

	JSON.parse = function(string/*, reviver: todo*/){
		if (type(string) !== "string" || !validate(string)) throw new SyntaxError('Invalid JSON')
		return eval('(' + string + ')')
	}

}/*:*/

module.exports = JSON
