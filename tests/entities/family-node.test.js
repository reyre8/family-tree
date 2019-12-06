const FamilyNode = require('./../../src/entities/family-node');
const Provider = require('./provider/family-node-provider');

describe('Test - family-node: constructor()', () => {
  it('Should have properties member, partner, parent and children', () => {
	  const expected = {
      member: {
      	name: 'Reynaldo',
      	gender: 'Male'
      },
      partner: null,
      parent: null,
      children: [] 
  	}
  	const familyNode = new FamilyNode(Provider.constructor());
    expect(familyNode).toMatchObject(expected);
  });
  it('Should throw Error, when member is invalid.', () => {
    expect(() => {
      const member = 'INVALID-PERSON-OBJECT';
      const familyNode = new FamilyNode(member);
    }).toThrowError(
      Error('[FAMILY_NODE_ERROR]-MEMBER_INVALID_PERSON')
    );
  });
  it('Should throw Error, when member is not provided.', () => {
    expect(() => {
      const familyNode = new FamilyNode();
    }).toThrowError(
      Error('[FAMILY_NODE_ERROR]-MEMBER_COMPULSORY')
    );
  });
  it('Should throw Error, when partner is not invalid.', () => {
    expect(() => {
      const partner = 'INVALID-PERSON-OBJECT';
      const familyNode = new FamilyNode(Provider.constructor(), partner);
    }).toThrowError(
      Error('[FAMILY_NODE_ERROR]-PARTNER_INVALID_PERSON')
    );
  });
});

describe('Test - family-node: findAncestor()', () => {
  var familyNode;
  beforeEach(() => {
    familyNode = new FamilyNode(Provider.findAncestor().person);
  });
  it('Should return same, level provided is 0', () => {
    expect(familyNode.findAncestor(0)).toMatchObject(familyNode);
  });
  it('Should return direct parent, if level provided is 1', () => {
    const parentFamilyNode = new FamilyNode(Provider.findAncestor().parent);
    familyNode.parent = parentFamilyNode;
    expect(familyNode.findAncestor(1)).toMatchObject(parentFamilyNode);
  });
  it('Should return null, if level provided does not match an ancestor high', () => {
    const parentFamilyNode = new FamilyNode(Provider.findAncestor().parent);
    familyNode.parent = parentFamilyNode;
    expect(familyNode.findAncestor(3)).toBeNull();
  });
});
