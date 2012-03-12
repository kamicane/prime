/*
type
*/

var toString = Object.prototype.toString,
	types = /number|object|array|string|function|date|regexp|boolean/

var type = function(object){
	if (object == null) return "none"
	var string = toString.call(object).slice(8, -1).toLowerCase()
	if (string === "number" && isNaN(object)) return "none"
	if (string === "function") return "method"
	if (!types.test(string)) string = "object"
	return ((string === "object") && (object.length != null) && (type(object.length) === "number")) ? "list" : string
}
