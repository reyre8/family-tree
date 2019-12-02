/**
 * Class that controls the nodes added to a tree
 *
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 */
function FamilyNode(member, partner=null) {
    this.member = member;
    this.partner = partner;
    this.parent = null;
    this.children = [];
}

/**
 * Finds in the node, the parent ancestor indicated on level.
 * If the level provided is 0, the function returns the same
 * node.
 *
 * @param {Integer} Level of the ancestor to find
 * @return {Node} The parent found, otherwise, it returns null
 */
FamilyNode.prototype.findAncestor = function(level) {
  let parent = this;
  for(let i=0; i<level; i++) {
    if (parent.hasOwnProperty('parent')) {
      parent = parent.parent;
    } else {
      return null;
    }
  }
  return parent;
}

module.exports = FamilyNode;