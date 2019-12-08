const FamilyTreeInstructionFactory =
  require('./../../src/factories/family-tree-instruction-factory');
const FamilyTreeInstruction =
  require('./../../src/entities/family-tree-instruction');
const Provider =
  require('./provider/family-tree-instruction-factory-provider');

describe('Test - FamilyTreeInstructionFactory', () => {
  it('Should return an instance of FamilyTreeInstruction', () => {
    const familyTreeInstruction = FamilyTreeInstructionFactory(
      Provider.params().familyTree
    );
    expect(familyTreeInstruction).toBeInstanceOf(FamilyTreeInstruction);
  });
});
