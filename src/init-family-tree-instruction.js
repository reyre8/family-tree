const { member, partner } = require('./../data/root-node');
const FamilyNodeFactory = require('./factories/family-node-factory');
const FamilyTreeFactory = require('./factories/family-tree-factory');
const FamilyTreeInstructionFactory =
  require('./factories/family-tree-instruction-factory');

/**
 * Initialises a family tree instruction with default data
 *
 * @return {FamilyTree} familyTree
 */
module.exports = () => {
  const familyNode = FamilyNodeFactory(
    member.name,
    member.gender,
    partner.name,
    partner.gender
  );
  const familyTree = FamilyTreeFactory(familyNode);
  return FamilyTreeInstructionFactory(familyTree);
};
