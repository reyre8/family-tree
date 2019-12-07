const FamilyNodeFactory = require('./../../../src/factories/family-node-factory');
const FamilyTreeFactory = require('./../../../src/factories/family-tree-factory');

module.exports = {
  params: () => {
  	const familyNode = FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female');
    return {
      familyTree: FamilyTreeFactory(familyNode)
    }
  }
}
