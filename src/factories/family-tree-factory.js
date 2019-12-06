const FamilyTree = require('./../entities/family-tree/family-tree');

module.exports = (tree) => {
  return new FamilyTree(tree);
}
