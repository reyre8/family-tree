const FamilyTreeOperation = require('./../entities/family-tree-operation');

module.exports = (tree) => {
  return new FamilyTreeOperation(tree);
}
