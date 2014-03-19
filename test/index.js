"use strict";

var expect = require('expect.js')
var prime = require('../index')

var Animal = prime({

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

var Cat = prime({

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

var Lion = prime({

    inherits: Cat,

    ferocious: true,

    constructor: function(name){
        Lion.parent.constructor.call(this, name, "rarr");
    },

    eat: function(){
        return 'lion:eat:' + this.name;
    }

});

var Actions = prime({

    jump: function(){
        return 'actions:jump:' + this.name;
    },

    sleep: function(){
        return 'actions:sleep:' + this.name;
    }

});

var Attributes = prime({

    color: function(){
        return 'attributes:color:' + this.name;
    },

    size: function(){
        return 'attributes:size:' + this.name;
    }

});

var One = prime({})
var Two = prime({inherits: One, constructor: function(){
    this.id = "TWO"
}})
var Three = prime({inherits: Two})

describe("prime constructors", function(){

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

        expect(One.prototype.constructor).to.be.a(Function)
        expect(Three.prototype.constructor).to.be.a(Function)

    })

})

describe('prime creation', function(){

    it("should call the constructor upon instantiation", function(){
        var animal = new Animal('lamina');
        expect(animal.name).to.be('lamina');
        expect(animal.initialized).to.be.ok();
        expect(animal.say()).to.be('animal:say:lamina');
    });

    it("should use 'inherits' property to extend another prime", function(){
        var cat = new Cat('fluffy');
        expect(cat.name).to.be('fluffy');
        expect(cat.sound).to.be('miao');
        expect(cat.ferocious).to.eql(false);
        expect(cat.say()).to.be('animal:say:fluffy');
        expect(cat.eat()).to.be('cat:eat:fluffy');
        expect(cat.play()).to.be('cat:play:fluffy');
    });

    it("should use 'inherits' property to extend an extended prime", function(){
        var leo = new Lion('leo');
        expect(leo.name).to.be('leo');
        expect(leo.sound).to.be('rarr');
        expect(leo.ferocious).to.be.ok();
        expect(leo.say()).to.be('animal:say:leo');
        expect(leo.eat()).to.be('lion:eat:leo');
        expect(leo.play()).to.be('cat:play:leo');
    });

    it("should accept functions as constructors", function(){
        var Dog = prime(function(name) {
            this.name = name;
        });
        var rover = new Dog('rover');
        expect(rover.name).to.be('rover');
    });

    it("should use mixin to implement any number of primes", function(){
        var Dog = prime({
            inherits: Animal,
            mixin: [Actions, Attributes]
        });

        var rover = new Dog('rover');

        expect(rover.initialized).to.be.ok();
        expect(rover.eat()).to.be('animal:eat:rover');
        expect(rover.say()).to.be('animal:say:rover');
        expect(rover.jump()).to.be('actions:jump:rover');
        expect(rover.sleep()).to.be('actions:sleep:rover');
        expect(rover.size()).to.be('attributes:size:rover');
        expect(rover.color()).to.be('attributes:color:rover');

        var Fox = prime({
            inherits: Animal,
            mixin: Actions
        });

        var roger = new Fox('roger');

        expect(roger.jump()).to.be('actions:jump:roger');
        expect(roger.sleep()).to.be('actions:sleep:roger');
    });

    it("should alter the prime's prototype when implementing new methods", function(){
        var Dog = prime({
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

    it("should alter the prime's prototype when implementing new methods into the super prime", function(){
        var Dog = prime({
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

    it("should alter the prime's prototype when overwriting methods in the super prime", function(){
        var Dog = prime({
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

describe('prime::implement', function(){

    it('should implement an object', function(){
        var Dog = prime({
            inherits: Animal
        });

        Dog.implement(new Actions);

        var rover = new Dog('rover');

        expect(rover.name).to.be('rover');
        expect(rover.jump()).to.be('actions:jump:rover');
        expect(rover.sleep()).to.be('actions:sleep:rover');
    });

    it('should implement any number of objects', function(){
        var Dog = prime({
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
        var Dog = prime({
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

describe('prime toString', function(){

    it('should allow to implement toString', function(){

        var Person = prime({

            constructor: function(name){
                this.name = name;
            },

            toString: function(){
                return this.name;
            }

        });

        var Italian = prime({

            inherits: Person,

            toString: function(){
                return "It's me, " + this.name;
            }

        });

        expect((new Person('Valerio')) + '').to.be('Valerio');

        expect((new Italian('Valerio')) + '').to.be("It's me, Valerio");
    });

});
