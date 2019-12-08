const FamilyTreeOperation =
  require('./../../src/entities/family-tree-operation');
const Provider = require('./provider/family-tree-operation-provider');
const message = require('./../../src/libs/message');

/* eslint-disable no-new */
describe('Test - family-tree-operation: constructor()', () => {
  it('Should have properties tree, and match FamilyTree Object', () => {
    const expected = {
      familyTree: {
        _root: {
          member: {
            name: 'Reynaldo',
            gender: 'Male',
          },
          partner: {
            name: 'Tamara',
            gender: 'Female',
          },
          parent: null,
          children: [],
        },
      },
    };
    const familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
    expect(familyTreeOperation).toMatchObject(expected);
  });
  it('Should throw Error, when familyTree is invalid.', () => {
    expect(() => {
      const familyTree = 'INVALID-FAMILY-TREE';
      new FamilyTreeOperation(familyTree);
    }).toThrowError(Error(message.get('ERR_19')));
  });
  it('Should throw Error, when familyTree is not provided.', () => {
    expect(() => {
      new FamilyTreeOperation();
    }).toThrowError(
      Error(message.get('ERR_18'))
    );
  });
});

describe('Test - family-tree-operation: execute()', () => {
  let familyTreeOperation;
  beforeEach(() => {
    familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
  });
  it('Should execute ADD_CHILD operation', () => {
    const expected = message.get('SUC_1');
    const received = familyTreeOperation.execute(Provider.execute().addChild);
    expect(received).toBe(expected);
  });
  it('Should execute ADD_CHILD_WITH_PARTNER operation', () => {
    const expected = message.get('SUC_1');
    const received = familyTreeOperation.execute(
      Provider.execute().addChildWithPartner
    );
    expect(received).toBe(expected);
  });
  it('Should execute GET_RELATIONSHIP operation', () => {
    const expected = 'Sabrina';
    familyTreeOperation.execute(Provider.execute().addChild);
    const received = familyTreeOperation.execute(
      Provider.execute().getRelationship
    );
    expect(received).toBe(expected);
  });
  it('Should throw Error, when operation is invalid.', () => {
    expect(() => {
      familyTreeOperation.execute(Provider.execute().invalid);
    }).toThrowError(Error(message.get('ERR_13')));
  });
  it('Should throw Error, when operation is not an array.', () => {
    expect(() => {
      const operation = 'TEXT';
      familyTreeOperation.execute(operation);
    }).toThrowError(Error(message.get('ERR_14')));
  });
});

describe('Test - family-tree-operation: validateOperation()', () => {
  let familyTreeOperation;
  beforeEach(() => {
    familyTreeOperation = new FamilyTreeOperation(Provider.constructor());
  });
  it('Should return no error (null) if operation is valid', () => {
    const received = familyTreeOperation.validateOperation(
      Provider.validateOperation().valid
    );
    expect(received).toBeNull();
  });
  it('Should throw Error, when operation is invalid.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(
        Provider.validateOperation().invalid
      );
    }).toThrowError(Error(message.get('ERR_13')));
  });
  it('Should throw Error, when ADD_CHILD has invalid arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(
        Provider.validateOperation().invalidAddChild
      );
    }).toThrowError(Error(message.get('ERR_15')));
  });
  it('Should throw Error, when ADD_CHILD_WITH_PARTNER ' +
     'has invalid arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(
        Provider.validateOperation().invalidAddChildWithPartner
      );
    }).toThrowError(Error(message.get('ERR_16')));
  });
  it('Should throw Error, when GET_RELATIONSHIP has invalid arguments.', () => {
    expect(() => {
      familyTreeOperation.validateOperation(
        Provider.validateOperation().invalidGetRelationship
      );
    }).toThrowError(Error(message.get('ERR_17')));
  });
});
