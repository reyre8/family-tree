const FamilyTreeOperationFactory = require('./../../src/factories/family-tree-operation-factory');
const FamilyTreeOperation = require('./../../src/entities/family-tree-operation');
const Provider = require('./provider/family-tree-operation-factory-provider');

describe('Test - FamilyTreeOperationFactory', () => {
  it('Should return an instance of FamilyTreeOperation', () => {
    const familyTreeOperation = FamilyTreeOperationFactory(Provider.params().familyTree);
    expect(familyTreeOperation).toBeInstanceOf(FamilyTreeOperation);
  });
});
