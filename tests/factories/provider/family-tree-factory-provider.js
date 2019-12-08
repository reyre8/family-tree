const FamilyNodeFactory =
  require('./../../../src/factories/family-node-factory');

module.exports = {
  params: () =>
    ({
      familyNode: FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female'),
    }),
};
