const FamilyTree = require('./../../src/entities/family-tree/family-tree');
const Provider = require('./provider/family-tree-provider');

/* eslint-disable no-new */
describe('Test - family-tree: constructor()', () => {
  it('Should have property _root, and match FamilyNode Object', () => {
    const expected = {
      _root: {
        member: {
          name: 'Reynaldo',
          gender: 'Male',
        },
        partner: null,
        parent: null,
        children: [],
      },
    };
    const familyTree = new FamilyTree(Provider.constructor());
    expect(familyTree).toMatchObject(expected);
  });
  it('Should throw Error, when familyNode is invalid.', () => {
    expect(() => {
      const familyNode = 'INVALID-FAMILY-NODE';
      new FamilyTree(familyNode);
    }).toThrowError(Error('[FAMILY_TREE_ERROR]-INVALID_FAMILY_NODE'));
  });
  it('Should throw Error, when familyNode is not provided.', () => {
    expect(() => {
      new FamilyTree();
    }).toThrowError(Error('[FAMILY_TREE_ERROR]-NAME_COMPULSORY'));
  });
});

describe('Test - family-tree: traverse()', () => {
  let familyTree;
  beforeEach(() => {
    familyTree = new FamilyTree(Provider.constructor());
  });
  it('Should match array ["Reynaldo-Male"]', () => {
    const expected = ['Reynaldo-Male'];
    const received = [];
    familyTree.traverse((node) => {
      received.push(`${node.member.name}-${node.member.gender}`);
    });
    expect(received).toStrictEqual(expected);
  });
});

describe('Test - family-tree: find()', () => {
  let familyTree;
  beforeEach(() => {
    familyTree = new FamilyTree(Provider.find());
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
  let familyTree;
  let newFamilyNode;
  beforeEach(() => {
    familyTree = new FamilyTree(Provider.add().parent);
    newFamilyNode = Provider.add().child;
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
    const received = `${node.member.name}-${node.member.gender}`;
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

describe('Test - family-tree: search()', () => {
  let familyTree;
  beforeEach(() => {
    familyTree = new FamilyTree(Provider.search().grandParent);
    familyTree.add('Tamara', Provider.search().parent);
    familyTree.add('Tamara', Provider.search().uncle);
    familyTree.add('Tamara', Provider.search().uncle2);
    familyTree.add('Tamara', Provider.search().aunt);
    familyTree.add('Sabrina', Provider.search().son);
    familyTree.add('Natalia', Provider.search().daughter);
  });
  it('Mark Maternal-Aunt, should return "Hercilia"', () => {
    const expected = 'Hercilia';
    const received = familyTree.search('Mark', 'Maternal-Aunt');
    expect(received).toBe(expected);
  });
  it('Mark Paternal-Aunt, should return "NONE"', () => {
    const expected = 'NONE';
    const received = familyTree.search('Mark', 'Paternal-Aunt');
    expect(received).toBe(expected);
  });
  it('Nayreth Paternal-Uncle, should return "Rich"', () => {
    const expected = 'Rich';
    const received = familyTree.search('Nayreth', 'Paternal-Uncle');
    expect(received).toBe(expected);
  });
  it('Mark Maternal-Uncle, should return "Ruben Rich"', () => {
    const expected = 'Ruben Rich';
    const received = familyTree.search('Mark', 'Maternal-Uncle');
    expect(received).toBe(expected);
  });
  it('Ruben Daughter, should return "Nayreth"', () => {
    const expected = 'Nayreth';
    const received = familyTree.search('Ruben', 'Daughter');
    expect(received).toBe(expected);
  });
  it('Tamara Daughter, should return "Sabrina Hercilia"', () => {
    const expected = 'Sabrina Hercilia';
    const received = familyTree.search('Tamara', 'Daughter');
    expect(received).toBe(expected);
  });
  it('Jordan Siblings, should return "NONE"', () => {
    const expected = 'NONE';
    const received = familyTree.search('Jordan', 'Siblings');
    expect(received).toBe(expected);
  });
  it('Rich Siblings, should return "Sabrina Ruben Hercilia"', () => {
    const expected = 'Sabrina Ruben Hercilia';
    const received = familyTree.search('Rich', 'Siblings');
    expect(received).toBe(expected);
  });
  it('Rich Siblings, should return "Sabrina Ruben Hercilia"', () => {
    const expected = 'Sabrina Ruben Hercilia';
    const received = familyTree.search('Rich', 'Siblings');
    expect(received).toBe(expected);
  });
  it('Sabrina Sister-In-Law, should return "Natalia"', () => {
    const expected = 'Natalia';
    const received = familyTree.search('Sabrina', 'Sister-In-Law');
    expect(received).toBe(expected);
  });
  it('Ruben Brother-In-Law, should return "Jordan Daniel"', () => {
    const expected = 'Jordan Daniel';
    const received = familyTree.search('Ruben', 'Brother-In-Law');
    expect(received).toBe(expected);
  });
  it('Jordan Son, should return "Mark"', () => {
    const expected = 'Mark';
    const received = familyTree.search('Jordan', 'Son');
    expect(received).toBe(expected);
  });
  it('Should return INVALID_RELATION, relation is not valid', () => {
    const expected = 'INVALID_RELATION';
    const received = familyTree.search('Jordan', 'SOME-INVALID-RELATION');
    expect(received).toBe(expected);
  });
  it('Should return PERSON_NOT_FOUND, if person is not found', () => {
    const expected = 'PERSON_NOT_FOUND';
    const received = familyTree.search('Clark', 'Son');
    expect(received).toBe(expected);
  });
});
