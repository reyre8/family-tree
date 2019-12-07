const FamilyTreeOperationFactory = require('./family-tree-operation-factory');
const FamilyTreeInstruction = require('./../entities/family-tree-instruction');

module.exports = (tree) => {
  let familyTreeOperation = FamilyTreeOperationFactory(tree);
  return new FamilyTreeInstruction(familyTreeOperation);
}
