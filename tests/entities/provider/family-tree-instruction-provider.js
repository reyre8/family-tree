const FamilyNodeFactory = require('./../../../src/factories/family-node-factory');
const FamilyTreeFactory = require('./../../../src/factories/family-tree-factory');
const FamilyTreeOperationFactory = require('./../../../src/factories/family-tree-operation-factory');

module.exports = {
  constructor: () => {
    const familyNode = FamilyNodeFactory('Reynaldo', 'Male', 'Tamara', 'Female');
    const familyTree = FamilyTreeFactory(familyNode);
    return FamilyTreeOperationFactory(familyTree);
  },
  formatInstructionLine: () => 'ADD_CHILD Flora Minerva Female',
  processInstructionLine: () => 'ADD_CHILD Tamara Sabrina Female',
  readFile: () => {
    return {
      filePath: './tests/entities/provider/data/test-input.txt',
      invalidPath: './tests/entities/provider/data/invalid-path'
    }
  },
  processFromFile: () => {
    return {
      filePath: './tests/entities/provider/data/test-input.txt'
    }
  }
}
