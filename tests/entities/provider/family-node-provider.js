const PersonFactory = require('./../../../src/factories/person-factory');

module.exports = {
  constructor: () => {
    return PersonFactory('Reynaldo', 'Male');
  },
  findAncestor: () => {
    return {
      person: PersonFactory('Reynaldo', 'Male'),
      parent: PersonFactory('Daniel', 'Male')
    };
  }
}