const Person = require('./../../src/person');
const FamilyNode = require('./../../src/family-node');
const FamilyTree = require('./../../src/family-tree');

module.exports = {
  constructor: () => {
    return new FamilyTree(
      new FamilyNode(
        new Person('Reynaldo', 'Male'),
        new Person('Tamara', 'Female')
      )
    );
  },
  execute: () => {
    return {
      addChild: [
        'ADD_CHILD',
        'Tamara',
        'Sabrina',
        'Female'
      ],
      getRelationship: [
        'GET_RELATIONSHIP',
        'Reynaldo',
        'Daughter'
      ],
      invalid: [
        'INVALID_OPERATION',
        'Reynaldo',
        'Daughter'
      ]
    }
  },
  validateOperation: () => {
    return {
      valid: [
        'ADD_CHILD',
        'Tamara',
        'Sabrina',
        'Female'
      ],
      invalid: [
        'INVALID_OPERATION',
        'Reynaldo',
        'Daughter'
      ],
      invalidAddChild: [
        'ADD_CHILD',
        'Tamara'
      ],
      invalidGetRelationship: [
        'GET_RELATIONSHIP',
        'Reynaldo'
      ],
    }
  }
}
