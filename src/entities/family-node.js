const Person = require('./person');

/**
 * Class that controls the nodes added to a family tree
 */
class FamilyNode {
  /**
   * Class constructor
   *
   * @param {Object} member - The direct member of the family
   * @param {Object} partner - If provided, the members partner
   */
  constructor(member, partner = null) {
    if (this.validate(member, partner)) {
      this.member = member;
      this.partner = partner;
      this.parent = null;
      this.children = [];
    }
  }

  /**
   * Finds in the node, the parent ancestor indicated on the given level.
   * If the level provided is 0, the function returns the same
   * node.
   *
   * @param {Integer} Level - Level of the ancestor to find
   * @return {Object} The parent found, otherwise, it returns null
   */
  findAncestor(level) {
    let parent = this;
    for (let i = 0; i < level; i++) {
      if (parent && Object.prototype.hasOwnProperty.call(parent, 'parent')) {
        parent = parent.parent;
      } else {
        return null;
      }
    }

    return parent;
  }

  /**
   * Verifies if the properties member and partner are valid
   *
   * @param {Object} member The direct member of the family
   * @param {Object} partner If provided, the members partner
   * @return {Boolean} true if there are no errors, otherwise,
   * it throws an Error
   */
  validate(member, partner) {
    if (!member) {
      throw Error('[FAMILY_NODE_ERROR]-MEMBER_COMPULSORY');
    }

    if (!(member instanceof Person)) {
      throw Error('[FAMILY_NODE_ERROR]-MEMBER_INVALID_PERSON');
    }

    if (partner && !(partner instanceof Person)) {
      throw Error('[FAMILY_NODE_ERROR]-PARTNER_INVALID_PERSON');
    }

    return true;
  }
}

module.exports = FamilyNode;
