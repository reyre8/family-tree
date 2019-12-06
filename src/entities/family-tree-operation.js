const FamilyTree = require('./family-tree/family-tree');
const FamilyNodeFactory = require('./../factories/family-node-factory');

/**
 * Class that controls the operation performed on a FamilyTree Object
 */
class FamilyTreeOperation {

  /**
   * Class constructor
   *
   * @param {FamilyTree} Object on which the operations are going to be performed
   */
  constructor(familyTree) {
    if (this.validate(familyTree))
      this.familyTree = familyTree;
  }

  /**
   * Executes a given operation that is reflected on the property familyTree
   *
   * @param {Array} operation Collection that contains the operation with arguments
   * @return {String} Operation result
   */
  execute(operation=[]) {
    let error = this.validateOperation(operation);
    if(error) {
      return error;
    } else {
      switch(operation[0]) {
        case 'ADD_CHILD':
          return this.familyTree.add(operation[1], FamilyNodeFactory(operation[2], operation[3]));
          break;
        case 'GET_RELATIONSHIP':
          return this.familyTree.search(operation[1], operation[2]);
          break;
        default:
          return 'INVALID_OPERATION';
          break;
      }
    }
  }

  /**
   * Validates a given operation and its arguments
   *
   * @param {Array} operation Collection that contains the operation with arguments
   * @return {String} Validation error if exists, otherwise null
   */
  validateOperation(operation) {
    if (!Array.isArray(operation))
      throw Error('OPERATION_SHOULD_BE_ARRAY');
    switch(operation[0]) {
      case 'ADD_CHILD':
        if(operation.length !== 4) {
          throw Error('[ADD_CHILD_ERROR]-INVALID_ARGUMENT_NUMBER');
        }
        break;
      case 'GET_RELATIONSHIP':
        if(operation.length !== 3) {
          throw Error('[GET_RELATIONSHIP_ERROR]-INVALID_ARGUMENT_NUMBER');
        }
        break;
      default:
        throw Error('INVALID_OPERATION');
        break;
    }
    return null;
  }

  /**
  * Verifies if the property familyNode is valid
  *
  * @param {FamilyNode} familyNode
  * @return {Boolean} true if no errors, otherwise, it throws an Error
  */
  validate(familyTree) {
    if (!familyTree)
      throw Error('[FAMILY_TREE_OPERATION_ERROR]-FAMILY_TREE_COMPULSORY');
    if (!(familyTree instanceof FamilyTree))
      throw Error('[FAMILY_TREE_OPERATION_ERROR]-INVALID_FAMILY_TREE');
    return true
  }

}

module.exports = FamilyTreeOperation;