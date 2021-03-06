const FamilyNodeFactory =
  require('./../../../src/factories/family-node-factory');

module.exports = {
  constructor: () =>
    FamilyNodeFactory('Reynaldo', 'Male'),
  find: () =>
    FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female'),
  add: () =>
    ({
      parent: FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female'),
      child: FamilyNodeFactory('Sabrina', 'Female'),
    }),
  search: () =>
    ({
      grandParent: FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female'),
      parent: FamilyNodeFactory('Sabrina', 'Female', 'Jordan', 'Male'),
      uncle: FamilyNodeFactory('Ruben', 'Male', 'Natalia', 'Female'),
      uncle2: FamilyNodeFactory('Rich', 'Male'),
      aunt: FamilyNodeFactory('Hercilia', 'Female', 'Daniel', 'Male'),
      son: FamilyNodeFactory('Mark', 'Male'),
      daughter: FamilyNodeFactory('Nayreth', 'Female'),
    }),
};
