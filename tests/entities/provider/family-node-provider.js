const PersonFactory = require('./../../../src/factories/person-factory');

module.exports = {
  constructor: () =>
    PersonFactory('Reynaldo', 'Male'),
  findAncestor: () =>
    ({
      person: PersonFactory('Reynaldo', 'Male'),
      parent: PersonFactory('Daniel', 'Male'),
    }),
};
