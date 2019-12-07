const FamilyNodeFactory = require('./../../../src/factories/family-node-factory');

module.exports = {
  params: () => {
    return {
      familyNode: FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female')
    }
  }
}
