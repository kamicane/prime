var box = require("../util/box")

var types = {
	array: require("./array"),
	string: require("./string"),
	method: require("./method"),
	number: require("./number"),
	object: require("./object"),
	regexp: require("./regexp")
}

box.define("list", types.array)

for (var name in types){
	var type = types[name]
	box.define(name, type)
	box[name].install = type.install
}

module.exports = box
