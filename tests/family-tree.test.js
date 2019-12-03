const Person = require('./../src/person');
const FamilyNode = require('./../src/family-node');
const FamilyTree = require('./../src/family-tree');

describe('Test - family-tree: constructor()', () => {
  it('Should have property _root, and match FamilyNode Object', () => {
	  const expected = {
      _root: {
        member: {
          name: 'Reynaldo',
          gender: 'Male'
        },
        partner: null,
        parent: null,
        children: []
      }
    }
  	const member = new Person('Reynaldo', 'Male');
  	const familyNode = new FamilyNode(member);
    const familyTree = new FamilyTree(familyNode);
    expect(familyTree).toMatchObject(expected);
  });
  it('Should throw Error, when familyNode is invalid.', () => {
    expect(() => {
      const familyNode = 'INVALID-FAMILY-NODE';
      const familyTree = new FamilyTree(familyNode);
    }).toThrowError(
      Error('[FAMILY_TREE_ERROR]-INVALID_FAMILY_NODE')
    );
  });
  it('Should throw Error, when familyNode is not provided.', () => {
    expect(() => {
      const familyNode = new FamilyTree();
    }).toThrowError(
      Error('[FAMILY_TREE_ERROR]-NAME_COMPULSORY')
    );
  });
});

describe('Test - family-tree: traverse()', () => {
  var familyTree;
  beforeEach(() => {
    const member = new Person('Reynaldo', 'Male');
    const familyNode = new FamilyNode(member);
    familyTree = new FamilyTree(familyNode);
  });
  it('Should match array ["Reynaldo-Male"]', () => {
    const expected = ['Reynaldo-Male'];
    var received = [];
    familyTree.traverse((node) => {
      received.push(`${node.member.name}-${node.member.gender}`);
    });
    expect(received).toStrictEqual(expected);
  });
});

describe('Test - family-tree: find()', () => {
  var familyTree;
  beforeEach(() => {
    const member = new Person('Reynaldo', 'Male');
    const partner = new Person('Tamara', 'Female');
    const familyNode = new FamilyNode(member, partner);
    familyTree = new FamilyTree(familyNode);
  });
  it('Should match find node where member: Reynaldo', () => {
    const received = familyTree.find('Reynaldo');
    expect(received).toMatchObject(familyTree._root);
  });
  it('Should match find node where partner: Tamara', () => {
    const received = familyTree.find('Tamara');
    expect(received).toMatchObject(familyTree._root);
  });
  it('Should return null if name is not found as member/partner', () => {
    const received = familyTree.find('Daniel');
    expect(received).toBeNull();
  });
});

describe('Test - family-tree: add()', () => {
  var familyTree;
  var newFamilyNode;
  beforeEach(() => {
    const member = new Person('Reynaldo', 'Male');
    const partner = new Person('Tamara', 'Female');
    const familyNode = new FamilyNode(member, partner);
    const newMember = new Person('Sabrina', 'Female');
    familyTree = new FamilyTree(familyNode);
    newFamilyNode = new FamilyNode(newMember);
  });
  it('Should match CHILD_ADDITION_SUCCEEDED', () => {
    const expected = 'CHILD_ADDITION_SUCCEEDED';
    const received = familyTree.add('Tamara', newFamilyNode);
    expect(received).toBe(expected);
  });
  it('Should find Sabrina, after she is added', () => {
    familyTree.add('Tamara', newFamilyNode);
    const node = familyTree.find('Sabrina');
    const expected = 'Sabrina-Female';
    const received = `${node.member.name}-${node.member.gender}`
    expect(received).toBe(expected);
  });
  it('Should return PERSON_NOT_FOUND, if person is not found', () => {
    const expected = 'PERSON_NOT_FOUND';
    const received = familyTree.add('Daniela', newFamilyNode);
    expect(received).toBe(expected);
  });
  it('Should return CHILD_ADDITION_FAILED, if person is not Female', () => {
    const expected = 'CHILD_ADDITION_FAILED';
    const received = familyTree.add('Reynaldo', newFamilyNode);
    expect(received).toBe(expected);
  });
});
