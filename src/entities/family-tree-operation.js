const FamilyTree = require('./family-tree/family-tree');
const FamilyNodeFactory = require('./../factories/family-node-factory');
const message = require('./../libs/message');

const OP_ADD_CHILD = 'ADD_CHILD';
const OP_ADD_CHILD_WITH_PARTNER = 'ADD_CHILD_WITH_PARTNER';
const OP_GET_RELATIONSHIP = 'GET_RELATIONSHIP';

/**
 * Class that controls the operation performed on a FamilyTree Object
 */
class FamilyTreeOperation {
  /**
   * Class constructor
   *
   * @param {Object} familyTree - Object on which
   * the operations are going to be performed
   */
  constructor(familyTree) {
    if (this.validate(familyTree)) this.familyTree = familyTree;
  }

  /**
   * Executes a given operation that is reflected on the property familyTree
   *
   * @param {Array} operation - Collection that contains
   * the operation with its arguments
   * @return {String} Operation result
   */
  execute(operation = []) {
    const error = this.validateOperation(operation);
    if (error) {
      return error;
    }

    switch (operation[0]) {
      case OP_ADD_CHILD:
        return this.familyTree.add(
          operation[1],
          FamilyNodeFactory(operation[2], operation[3])
        );
      case OP_ADD_CHILD_WITH_PARTNER:
        return this.familyTree.add(
          operation[1],
          FamilyNodeFactory(
            operation[2],
            operation[3],
            operation[4],
            operation[5]
          )
        );
      case OP_GET_RELATIONSHIP:
        return this.familyTree.search(operation[1], operation[2]);
      default:
        return message.get('ERR_13');
    }
  }

  /**
   * Validates a given operation and its arguments
   *
   * @param {Array} operation - Collection that contains the
   * operation with arguments
   * @return {String} Validation error if exists, otherwise null
   */
  validateOperation(operation) {
    if (!Array.isArray(operation)) {
      throw Error(message.get('ERR_14'));
    }

    switch (operation[0]) {
      case OP_ADD_CHILD:
        if (operation.length !== 4) {
          throw Error(message.get('ERR_15'));
        }

        break;
      case OP_ADD_CHILD_WITH_PARTNER:
        if (operation.length !== 6) {
          throw Error(message.get('ERR_16'));
        }

        break;
      case OP_GET_RELATIONSHIP:
        if (operation.length !== 3) {
          throw Error(message.get('ERR_17'));
        }

        break;
      default:
        throw Error(message.get('ERR_13'));
    }

    return null;
  }

  /**
   * Verifies if the property familyNode is valid
   *
   * @param {Object} familyNode
   * @return {Boolean} true if no errors, otherwise, it throws an Error
   */
  validate(familyTree) {
    if (!familyTree) {
      throw Error(message.get('ERR_18'));
    }

    if (!(familyTree instanceof FamilyTree)) {
      throw Error(message.get('ERR_19'));
    }

    return true;
  }
}

module.exports = FamilyTreeOperation;
