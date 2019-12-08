const FamilyTreeOperationFactory = require('./family-tree-operation-factory');
const FamilyTreeInstruction = require('./../entities/family-tree-instruction');

/**
 * Generates an instance of FamilyTreeInstruction.
 *
 * @param {Object} familyTree - Instance of FamilyTree.
 * @return {Object} Returns an instance of FamilyTreeInstruction.
 */
module.exports = (familyTree) => {
  const familyTreeOperation = FamilyTreeOperationFactory(familyTree);
  return new FamilyTreeInstruction(familyTreeOperation);
};
