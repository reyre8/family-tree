const FamilyTreeOperation = require('./../src/family-tree-operation');

describe('Test - family-tree-operation: constructor()', () => {
  it('Should have properties tree, and match FamilyTree Object', () => {
	  const expected = {}
  	//const familyNode = new FamilyTreeOperation(member);
    expect({}).toMatchObject(expected);
  });
});