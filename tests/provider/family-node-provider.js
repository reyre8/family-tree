const Person = require('./../../src/person');

module.exports = {
  constructor: () => {
    return new Person('Reynaldo', 'Male');
  },
  findAncestor: () => {
    return {
      person: new Person('Reynaldo', 'Male'),
      parent: new Person('Daniel', 'Male')
    };
  }
}