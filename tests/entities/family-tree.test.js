const FamilyTree = require('./../../src/entities/family-tree/family-tree');
const Provider = require('./provider/family-tree-provider');
const message = require('./../../src/libs/message');

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
    }).toThrowError(Error(message.get('ERR_5')));
  });
  it('Should throw Error, when familyNode is not provided.', () => {
    expect(() => {
      new FamilyTree();
    }).toThrowError(Error(message.get('ERR_4')));
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
    expect(received).toMatchObject(Provider.find());
  });
  it('Should match find node where partner: Tamara', () => {
    const received = familyTree.find('Tamara');
    expect(received).toMatchObject(Provider.find());
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
  it(`Should match ${message.get('SUC_1')}`, () => {
    const expected = message.get('SUC_1');
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
  it(`Should return ${message.get('ERR_1')}, if person is not found`, () => {
    const expected = message.get('ERR_1');
    const received = familyTree.add('Daniela', newFamilyNode);
    expect(received).toBe(expected);
  });
  it(`Should return ${message.get('ERR_2')}, if person is not Female`, () => {
    const expected = message.get('ERR_2');
    const received = familyTree.add('Reynaldo', newFamilyNode);
    expect(received).toBe(expected);
  });
  it(`Should return ${message.get('ERR_23', 'Sabrina')},
    if person already exist`, () => {
    const expected = message.get('ERR_23', 'Sabrina');
    familyTree.add('Tamara', newFamilyNode);
    const received = familyTree.add('Tamara', newFamilyNode);
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
  it(`Jordan Siblings, should return "${message.get('SUC_2')}"`, () => {
    const expected = message.get('SUC_2');
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
  it(`Should return ${message.get('ERR_3')}, if relation is not valid`, () => {
    const expected = message.get('ERR_3');
    const received = familyTree.search('Jordan', 'SOME-INVALID-RELATION');
    expect(received).toBe(expected);
  });
  it(`Should return ${message.get('ERR_1')}, if person is not found`, () => {
    const expected = message.get('ERR_1');
    const received = familyTree.search('Clark', 'Son');
    expect(received).toBe(expected);
  });
});
