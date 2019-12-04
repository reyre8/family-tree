const Person = require('./../../src/person');
const FamilyNode = require('./../../src/family-node');

module.exports = {
  constructor: () => {
    return new FamilyNode(
      new Person('Reynaldo', 'Male')
    );
  },
  find: () => {
    return new FamilyNode(
      new Person('Reynaldo', 'Male'),
      new Person('Tamara', 'Female')
    );
  },
  add: () => {
    return {
      parent: new FamilyNode(
        new Person('Reynaldo', 'Male'),
        new Person('Tamara', 'Female')
      ),
      child: new FamilyNode(
        new Person('Sabrina', 'Female')
      )
    }
  },
  search: () => {
    return {
      grandParent: new FamilyNode(
        new Person('Reynaldo', 'Male'),
        new Person('Tamara', 'Female')
      ),
      parent: new FamilyNode(
        new Person('Sabrina', 'Female'),
        new Person('Jordan', 'Male')
      ),
      uncle: new FamilyNode(
        new Person('Ruben', 'Male'),
        new Person('Natalia', 'Female')
      ),
      uncle2: new FamilyNode(
        new Person('Rich', 'Male'),
      ),
      aunt: new FamilyNode(
        new Person('Hercilia', 'Female'),
        new Person('Daniel', 'Male')
      ),
      son: new FamilyNode(
        new Person('Mark', 'Male'),
      ),
      daughter: new FamilyNode(
        new Person('Nayreth', 'Female'),
      )
    }
  }
}
