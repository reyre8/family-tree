const FamilyNode = require('./../family-node');
const relationships = require('./relationship-matrix');
const message = require('./../../libs/message');

/**
 * Class that controls the family tree structure
 */
class FamilyTree {
  /**
   * Class constructor
   *
   * @param {Object} familyNode
   */
  constructor(familyNode) {
    if (this.validate(familyNode)) this._root = familyNode;
  }

  /**
   * Routine defined to traverse the family-tree
   *
   * @param {function} callback Callback to be executed for every node that
   * is visited
   */
  traverse(callback) {
    (function recurse(currentNode) {
      for (let i = 0, { length } = currentNode.children; i < length; i++) {
        recurse(currentNode.children[i]);
      }

      callback(currentNode);
    }(this._root));
  }

  /**
   * Searches for a node that matches the given name, on either
   * member.name or partner.name
   *
   * @param {String} name - Name to be used in the search
   * @return {FamilyNode} Returns the node if it's found.
     Otherwise it returns null
   */
  find(name) {
    let nodeToFind = null;
    this.traverse.call(this, (node) => {
      if (
        node.member.name === name ||
        (node.partner && node.partner.name === name)
      ) {
        nodeToFind = node;
      }
    });
    return nodeToFind;
  }

  /**
   * Adds a new node (created with member and partner),
   * to a node that matches the given parent name
   *
   * @param {String} parentName - Name of the parent
   * @param {Object} familyNode - Node to be added
   * @return {String} Result of the operation
   */
  add(parentName, familyNode) {
    const parent = this.find(parentName);
    if (!parent) return message.get('ERR_1');

    // Verify that the member does not exist
    const member = this.find(familyNode.member.name);
    if (member) return message.get('ERR_23', familyNode.member.name);

    const targetType = parent.member.name === parentName ? 'member' : 'partner';
    if (!parent[targetType].isFemale()) return message.get('ERR_2');

    familyNode.parent = parent;
    parent.children.push(familyNode);
    return message.get('SUC_1');
  }

  /**
   * Searches for all relatives of the provided name,
   * according to the relation provided
   *
   * @param {String} name - Name of the person to search the relatives for
   * @param {Person} relation - Type of relation (defined on relationships)
   * @return {String} People related to the given name, based on the relation
   * provided.
   */
  search(name, relation) {
    if (!Object.prototype.hasOwnProperty.call(relationships, relation)) {
      return message.get('ERR_3');
    }

    const targetNode = this.find(name);
    if (!targetNode) return message.get('ERR_1');

    const targetType = targetNode.member.name === name ? 'partner' : 'member';
    const targetParent = targetNode.findAncestor(
      relationships[relation].parentLevel
    );
    const result = this.findRelatives(
      relation,
      targetNode,
      targetParent,
      targetType
    );
    return result.length > 0 ? result.join(' ') : message.get('SUC_2');
  }

  /**
   * Find relatives for a given targetNode according to the relation provided
   * @param {String} relation - Type of relation to search for
   * @param {Object} targetNode - The node to look the relations for
   * @param {Object} targetParent - The parent to be used as a pivot
   * @param {Object} targetType - Indicates if it's member/partner
   * @return {String} People related to the targetNode, based on the "relation"
   */
  findRelatives(relation, targetNode, targetParent, targetType) {
    const result = [];
    this.traverse.call(this, (node) => {
      if (node !== targetNode && targetParent === node.parent) {
        switch (relation) {
          case 'Siblings':
            if (targetType === 'partner') {
              result.push(node.member.name);
            }

            break;
          case 'Sister-In-Law':
          case 'Brother-In-Law':
            if (
              node[targetType] &&
              node[targetType].gender === relationships[relation].gender
            ) {
              result.push(node[targetType].name);
            }

            break;
          case 'Son':
          case 'Daughter':
            if (node.member.gender === relationships[relation].gender) {
              result.push(node.member.name);
            }

            break;
          case 'Maternal-Aunt':
          case 'Paternal-Aunt':
          case 'Maternal-Uncle':
          case 'Paternal-Uncle':
            if (
              targetNode.parent.member.gender ===
                relationships[relation].parentGender &&
              node !== targetNode.parent &&
              node.member.gender === relationships[relation].gender
            ) {
              result.push(node.member.name);
            }

            break;
          default:
            throw Error(message.get('ERR_3'));
        }
      }
    });
    return result;
  }

  /**
   * Verifies if the property familyNode is valid
   *
   * @param {Object} familyNode
   * @return {Boolean} true if no errors, otherwise, it throws an Error
   */
  validate(familyNode) {
    if (!familyNode) {
      throw Error(message.get('ERR_4'));
    }

    if (!(familyNode instanceof FamilyNode)) {
      throw Error(message.get('ERR_5'));
    }

    return true;
  }
}

module.exports = FamilyTree;
