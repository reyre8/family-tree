const Person = require('./person');
const FamilyNode = require('./family-node');

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
    this.familyTree = familyTree;
  }

  /**
   * Executes a given operation that is reflected on the property familyTree
   *
   * @param {Array} operation Collection that contains the operation with arguments
   * @return {String} Operation result
   */
  execute(operation=[]) {
    var error = this.validate(operation);
    if(error) {
      return error;
    } else {
      switch(operation[0]) {
        case 'ADD_CHILD':
          return this.familyTree.add(operation[1], new FamilyNode(new Person(operation[2], operation[3])));
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
  validate(operation=[]) {
    switch(operation[0]) {
      case 'ADD_CHILD':
        if(operation.length !== 4) {
          return 'ADD_CHILD_ERROR[INVALID_ARGUMENT_NUMBER]'
        }
        break;
      case 'GET_RELATIONSHIP':
        if(operation.length !== 3) {
          return 'GET_RELATIONSHIP_ERROR[INVALID_ARGUMENT_NUMBER]'
        }
        break;
      default:
        return 'INVALID_OPERATION';
        break;
    }
    return null;
  }
}

module.exports = FamilyTreeOperation;
