const FamilyTree = require('./../entities/family-tree/family-tree');

/**
 * Generates an instance of FamilyTree.
 *
 * @param {Object} rootNode - The family node to be set as root
 * @return {Object} Returns an instance of FamilyTree.
 */
module.exports = (rootNode) =>
  new FamilyTree(rootNode);
