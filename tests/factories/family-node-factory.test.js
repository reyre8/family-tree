const FamilyNodeFactory = require('./../../src/factories/family-node-factory');
const FamilyNode = require('./../../src/entities/family-node');
const Provider = require('./provider/family-node-factory-provider');

describe('Test - FamilyNodeFactory', () => {
  it('Should return an instance of FamilyNode', () => {
    const familyNode = FamilyNodeFactory(
      Provider.params().member.name,
      Provider.params().member.gender,
      Provider.params().partner.name,
      Provider.params().partner.gender
    );
    expect(familyNode).toBeInstanceOf(FamilyNode);
  });
  it('Should return an instance of FamilyNode (no partner)', () => {
    const familyNode = FamilyNodeFactory(
      Provider.params().member.name,
      Provider.params().member.gender
    );
    expect(familyNode).toBeInstanceOf(FamilyNode);
    expect(familyNode.partner).toBeNull();
  });
});
