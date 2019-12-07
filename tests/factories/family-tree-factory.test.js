const FamilyTreeFactory = require('./../../src/factories/family-tree-factory');
const FamilyTree = require('./../../src/entities/family-tree/family-tree');
const Provider = require('./provider/family-tree-factory-provider');

describe('Test - FamilyTreeFactory', () => {
  it('Should return an instance of FamilyTree', () => {
    const familyTree = FamilyTreeFactory(Provider.params().familyNode);
    expect(familyTree).toBeInstanceOf(FamilyTree);
  });
});
