const FamilyNodeFactory = require('./../../../src/factories/family-node-factory');
const FamilyTreeFactory = require('./../../../src/factories/family-tree-factory');

module.exports = {
  constructor: () => {
    let familyNode = FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female');
    return FamilyTreeFactory(familyNode);
  },
  execute: () => {
    return {
      addChild: [
        'ADD_CHILD',
        'Tamara',
        'Sabrina',
        'Female'
      ],
      addChildWithPartner: [
        'ADD_CHILD_WITH_PARTNER',
        'Tamara',
        'Sabrina',
        'Female',
        'Jordan',
        'Male'
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
      invalidAddChildWithPartner: [
        'ADD_CHILD_WITH_PARTNER',
        'Tamara',
        'Sabrina',
        'Male'
      ],
      invalidGetRelationship: [
        'GET_RELATIONSHIP',
        'Reynaldo'
      ],
    }
  }
}
