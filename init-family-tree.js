const { member, partner } = require('./data/root-node');
const FamilyNodeFactory = require('./src/factories/family-node-factory');
const FamilyTreeFactory = require('./src/factories/family-tree-factory');

/**
 * Initialises a family tree with default data
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
  return FamilyTreeFactory(familyNode);
};
