const FamilyTreeOperation = require('./../entities/family-tree-operation');

/**
 * Generates an instance of FamilyTreeOperation.
 *
 * @param {Object} familyTree - Instance of FamilyTree.
 * @return {Object} Returns an instance of FamilyTreeOperation.
 */
module.exports = (tree) =>
  new FamilyTreeOperation(tree);
