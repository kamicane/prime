"use strict";

var expect = require('expect.js')
var Class = require('../../prime'),
	create = require("../../util/create");

var Animal = Class({

	initialized: false,

	constructor: function(name, sound){
		this.name = name;
		this.sound = sound || '';
		this.initialized = true;
	},

	eat: function(){
		return 'animal:eat:' + this.name;
	},

	say: function(){
		return 'animal:say:' + this.name;
	}

});

var Cat = Class({

	inherits: Animal,

	ferocious: false,

	constructor: function(name, sound){
		Cat.parent.constructor.call(this, name, sound || 'miao');
	},

	eat: function(){
		return 'cat:eat:' + this.name;
	},

	play: function(){
		return 'cat:play:' + this.name;
	}

});

var Lion = Class({

	inherits: Cat,

	ferocious: true,

	constructor: function(name){
		Lion.parent.constructor.call(this, name, "rarr");
	},

	eat: function(){
		return 'lion:eat:' + this.name;
	}

});

var Actions = Class({

	jump: function(){
		return 'actions:jump:' + this.name;
	},

	sleep: function(){
		return 'actions:sleep:' + this.name;
	}

});

var Attributes = Class({

	color: function(){
		return 'attributes:color:' + this.name;
	},

	size: function(){
		return 'attributes:size:' + this.name;
	}

});

var One = Class({})
var Two = Class({inherits: One, constructor: function(){
	this.id = "TWO"
}})
var Three = Class({inherits: Two})

describe("Class constructors", function(){

	it("should have the correct constructor", function(){
		var one = new One();
		expect(one.constructor).to.be(One);

		var two = new Two();
		expect(two.constructor).to.be(Two);

		var three = new Three();
		expect(three.constructor).to.be(Three);

	})

	it("should call the parent constructor, even when not explicitly set", function(){
		var one = new One();
		expect(one.id).to.be(undefined);

		var two = new Two();
		expect(two.id).to.be("TWO");

		var three = new Three();
		expect(three.id).to.be("TWO");

		expect(one.constructor.toString()).to.eql("function (){}")
		expect(three.constructor.toString()).to.eql('function (){\n\t\treturn superproto.constructor.apply(this, arguments)\n\t}')

	})

})

describe('Class creation', function(){

	it("should call the constructor upon instantiation", function(){
		var animal = new Animal('lamina');
		expect(animal.name).to.be('lamina');
		expect(animal.initialized).to.be.ok();
		expect(animal.say()).to.be('animal:say:lamina');
	});

	it("should use 'inherits' property to extend another class", function(){
		var cat = new Cat('fluffy');
		expect(cat.name).to.be('fluffy');
		expect(cat.sound).to.be('miao');
		expect(cat.ferocious).to.eql(false);
		expect(cat.say()).to.be('animal:say:fluffy');
		expect(cat.eat()).to.be('cat:eat:fluffy');
		expect(cat.play()).to.be('cat:play:fluffy');
	});

	it("should use 'inherits' property to extend an extended class", function(){
		var leo = new Lion('leo');
		expect(leo.name).to.be('leo');
		expect(leo.sound).to.be('rarr');
		expect(leo.ferocious).to.be.ok();
		expect(leo.say()).to.be('animal:say:leo');
		expect(leo.eat()).to.be('lion:eat:leo');
		expect(leo.play()).to.be('cat:play:leo');
	});

	// it("should implement another class", function(){
	// 	var Dog = Class({mixin: Animal})
	//
	// 	var rover = new Dog('rover');
	// 	expect(rover.name).to.be('rover');
	// 	expect(rover.initialized).to.be.ok();
	// 	expect(rover.eat()).to.be('animal:eat:rover');
	// });
	//
	// it("should use 'Implements' property to implement any number of classes", function(){
	// 	var Dog = Class({
	// 		inherit: Animal,
	// 		mixin: [Actions, Attributes]
	// 	});
	//
	// 	var rover = new Dog('rover');
	// 	expect(rover.initialized).to.be.ok();
	// 	expect(rover.eat()).to.be('animal:eat:rover');
	// 	expect(rover.say()).to.be('animal:say:rover');
	// 	expect(rover.jump()).to.be('actions:jump:rover');
	// 	expect(rover.sleep()).to.be('actions:sleep:rover');
	// 	expect(rover.size()).to.be('attributes:size:rover');
	// 	expect(rover.color()).to.be('attributes:color:rover');
	// });

	it("should alter the Class's prototype when implementing new methods", function(){
		var Dog = Class({
			inherits: Animal
		});

		var rover = new Dog('rover');

		Dog.implement({
			jump: function(){
				return 'dog:jump:' + this.name;
			}
		});

		var spot = new Dog('spot');

		expect(spot.jump()).to.be('dog:jump:spot');
		expect(rover.jump()).to.be('dog:jump:rover');
	});

	it("should alter the Class's prototype when implementing new methods into the super class", function(){
		var Dog = Class({
			inherits: Animal
		});

		var rover = new Dog('rover');

		Animal.implement({
			jump: function(){
				return 'animal:jump:' + this.name;
			}
		});

		var spot = new Dog('spot');

		expect(spot.jump()).to.be('animal:jump:spot');
		expect(rover.jump()).to.be('animal:jump:rover');
	});

	it("should alter the Class's prototype when overwriting methods in the super class", function(){
		var Dog = Class({
			inherits: Animal
		});

		var rover = new Dog('rover');
		expect(rover.say()).to.be('animal:say:rover');

		Animal.implement({
			say: function(){
				return 'NEW:animal:say:' + this.name;
			}
		});

		var spot = new Dog('spot');

		expect(spot.say()).to.be('NEW:animal:say:spot');
		expect(rover.say()).to.be('NEW:animal:say:rover');
	});

});

describe('Class::implement', function(){

	it('should implement an object', function(){
		var Dog = Class({
			inherits: Animal
		});

		Dog.implement(new Actions);

		var rover = new Dog('rover');

		expect(rover.name).to.be('rover');
		expect(rover.jump()).to.be('actions:jump:rover');
		expect(rover.sleep()).to.be('actions:sleep:rover');
	});

	it('should implement any number of objects', function(){
		var Dog = Class({
			inherits: Animal
		});

		Dog.implement(new Actions).implement(new Attributes);

		var rover = new Dog('rover');

		expect(rover.name).to.be('rover');
		expect(rover.jump()).to.be('actions:jump:rover');
		expect(rover.sleep()).to.be('actions:sleep:rover');
		expect(rover.size()).to.be('attributes:size:rover');
		expect(rover.color()).to.be('attributes:color:rover');
	});

	it('should implement key-value objects', function(){
		var Dog = Class({
			inherits: Animal
		});

		Dog.implement({
			bark: function(){
				return 'woof!';
			},
			jump: function(){
				return 'jump';
			}
		});

		var rover = new Dog('rover');

		expect(rover.bark()).to.be('woof!');
		expect(rover.jump()).to.be('jump');
	});

});

describe('Class toString', function(){

	it('should allow to implement toString', function(){

		var Person = Class({

			constructor: function(name){
				this.name = name;
			},

			toString: function(){
				return this.name;
			}

		});

		var Italian = Class({

			inherits: Person,

			toString: function(){
				return "It's me, " + this.name;
			}

		});

		expect((new Person('Valerio')) + '').to.be('Valerio');

		expect((new Italian('Valerio')) + '').to.be("It's me, Valerio");
	});

});

// describe('Class Mutators', function(){
//
// 	it('should inherit mutators', function(){
//
// 		var Being = Class({});
// 		Being.defineMutator('Legs', function(legs){
// 			this.prototype.legs = legs;
// 		});
//
// 		var Person = Class({
// 			inherits: Being,
// 			Legs: 2,
// 			BeerCapacity: 10
// 		});
// 		Person.defineMutator('BeerCapacity', function(beers){
// 			this.prototype.beers = beers;
// 		});
//
// 		var Student = Class({
// 			inherits: Person,
// 			Legs: 2,
// 			BeerCapacity: 10
// 		});
//
// 		var olmo = new Person();
//
// 		expect(olmo.legs).to.be(2);
// 		expect(olmo.beer).to.beUndefined();
//
// 		var arian = new Student();
//
// 		expect(arian.legs).to.be(2);
// 		expect(arian.beers).to.be(10);
//
// 	});
//
// });

// describe('Protected methods', function(){
//
// 	it('should throw an error when calling a protected method', function(){
// 		var Person = Class({
// 			'protected parse': function(){
// 				this.parsed = true;
// 				return 'parsing...';
// 			},
// 			get: function(){
// 				return this.parse();
// 			}
// 		});
// 		var olmo = new Person;
//
// 		expect(olmo.parse).toThrow();
// 		expect(olmo.parsed).to.beFalsy();
// 		expect(olmo.get()).to.be('parsing...');
// 		expect(olmo.parsed).to.be.ok();
//
// 	});
//
// });
