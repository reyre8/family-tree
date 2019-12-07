const FamilyTreeOperation = require('./../../src/entities/family-tree-operation');
const Provider = require('./provider/family-tree-operation-provider');

describe('Test - family-tree-operation: constructor()', () => {
  it('Should have properties tree, and match FamilyTree Object', () => {
    const expected = {
      familyTree: {
        _root: {
          member: {
            name: 'Reynaldo',
            gender: 'Male'
          },
          partner: {
            name: 'Tamara',
            gender: 'Female'
          },
          parent: null,
          children: []
        }
      }
    }
  	const familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
    expect(familyTreeOperation).toMatchObject(expected);
  });
  it('Should throw Error, when familyTree is invalid.', () => {
    expect(() => {
      const familyTree = 'INVALID-FAMILY-TREE';
      const familyTreeOperation = new FamilyTreeOperation(familyTree);
    }).toThrowError(
      Error('[FAMILY_TREE_OPERATION_ERROR]-INVALID_FAMILY_TREE')
    );
  });
  it('Should throw Error, when familyTree is not provided.', () => {
    expect(() => {
      const familyTreeOperation = new FamilyTreeOperation();
    }).toThrowError(
      Error('[FAMILY_TREE_OPERATION_ERROR]-FAMILY_TREE_COMPULSORY')
    );
  });
});

describe('Test - family-tree-operation: execute()', () => {
  var familyTreeOperation;
  beforeEach(() => {
    familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
  });
  it('Should execute ADD_CHILD operation', () => {
    expected = 'CHILD_ADDITION_SUCCEEDED';
    const received = familyTreeOperation.execute(Provider.execute().addChild);
    expect(received).toBe(expected);
  });
  it('Should execute ADD_CHILD_WITH_PARTNER operation', () => {
    expected = 'CHILD_ADDITION_SUCCEEDED';
    const received = familyTreeOperation.execute(Provider.execute().addChildWithPartner);
    expect(received).toBe(expected);
  });
  it('Should execute GET_RELATIONSHIP operation', () => {
    expected = 'Sabrina';
    familyTreeOperation.execute(Provider.execute().addChild);
    const received = familyTreeOperation.execute(Provider.execute().getRelationship);
    expect(received).toBe(expected);
  });
  it('Should throw Error, when operation is invalid.', () => {
    expect(() => {
      familyTreeOperation.execute(Provider.execute().invalid);
    }).toThrowError(
      Error('INVALID_OPERATION')
    );
  });
  it('Should throw Error, when operation is not an array.', () => {
    expect(() => {
      const operation = 'TEXT';
      familyTreeOperation.execute(operation);
    }).toThrowError(
      Error('OPERATION_SHOULD_BE_ARRAY')
    );
  });
});

describe('Test - family-tree-operation: validateOperation()', () => {
  var familyTreeOperation;
  beforeEach(() => {
    familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
  });
  it('Should return no error (null) if operation is valid', () => {
    const received = familyTreeOperation.validateOperation(Provider.validateOperation().valid);
    expect(received).toBeNull();
  });
  it('Should throw Error, when operation is invalid.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(Provider.validateOperation().invalid);
    }).toThrowError(
      Error('INVALID_OPERATION')
    );
  });
  it('Should throw Error, when ADD_CHILD operation has wrong number of arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(Provider.validateOperation().invalidAddChild);
    }).toThrowError(
      Error('[ADD_CHILD_ERROR]-INVALID_ARGUMENT_NUMBER')
    );
  });
  it('Should throw Error, when ADD_CHILD_WITH_PARTNER operation has wrong number of arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(Provider.validateOperation().invalidAddChildWithPartner);
    }).toThrowError(
      Error('[ADD_CHILD_WITH_PARTNER]-INVALID_ARGUMENT_NUMBER')
    );
  });
  it('Should throw Error, when GET_RELATIONSHIP operation has wrong number of arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(Provider.validateOperation().invalidGetRelationship);
    }).toThrowError(
      Error('[GET_RELATIONSHIP_ERROR]-INVALID_ARGUMENT_NUMBER')
    );
  });
});
