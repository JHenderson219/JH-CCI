// var Person = function(name, gender) {
//   this.name = name;
//   this.gender = gender;
// };

// const Person = (name, gender) => {
//   this.name = name;
//   this.gender = gender;
//   return this;
// };

function Person(name, gender) {
  this.name = name;
  this.gender = gender;
};

function personFactory(options) {
  class Person {
    constructor(options) {
      this.name = options.name;
    }
  }
  class Man extends Person {
    constructor(options) {
      super(options);
      this.gender = 'M';
    }
  }
  class Woman extends Person {
    constructor(options) {
      super(options);
      this.gender = 'F';
    }
  }
  const personTypes = {
    'man': Man,
    'woman': Woman,
  };
  const Constructor = personTypes[options.type];
  return new Constructor(options);
}

const Steve = personFactory({name: 'Steve', type: 'man'});

console.log(Steve);

console.log(Object.entries(personFactory));
