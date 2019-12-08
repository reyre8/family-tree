const FamilyTreeInstruction =
  require('./../../src/entities/family-tree-instruction');
const Provider = require('./provider/family-tree-instruction-provider');
const message = require('./../../src/libs/message');

/* eslint-disable no-new */
describe('Test - family-tree-instruction: constructor()', () => {
  it('Should match FamilyTreeOperation Object', () => {
    const expected = {
      familyTreeOperation: {
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
      },
    };

    const familyTreeInstruction = new FamilyTreeInstruction(
      Provider.constructor()
    );
    expect(familyTreeInstruction).toMatchObject(expected);
  });
  it('Should throw Error, when familyTreeOperation is invalid.', () => {
    expect(() => {
      const familyTreeOperation = 'INVALID-FAMILY-TREE-OPERATION';
      new FamilyTreeInstruction(
        familyTreeOperation
      );
    }).toThrowError(
      Error(message.get('ERR_12'))
    );
  });
  it('Should throw Error, when familyTreeOperation is not provided.', () => {
    expect(() => {
      new FamilyTreeInstruction();
    }).toThrowError(
      Error(message.get('ERR_11'))
    );
  });
});

describe('Test - family-tree-instruction: formatInstructionLine()', () => {
  let familyTreeInstruction;
  beforeEach(() => {
    familyTreeInstruction = new FamilyTreeInstruction(Provider.constructor());
  });
  it("Should return Array ['ADD_CHILD', 'Flora', 'Minerva', 'Female']", () => {
    const expected = ['ADD_CHILD', 'Flora', 'Minerva', 'Female'];
    const received = familyTreeInstruction.formatInstructionLine(
      Provider.formatInstructionLine()
    );
    expect(received).toEqual(expected);
  });
  it("Should return an empty array if line is ''", () => {
    const expected = [];
    const received = familyTreeInstruction.formatInstructionLine('');
    expect(received).toEqual(expected);
  });
  it('Should throw Error, when line is not a valid string.', () => {
    expect(() => {
      familyTreeInstruction.formatInstructionLine(false);
    }).toThrowError(Error(message.get('ERR_10')));
  });
});

describe('Test - family-tree-instruction: processInstructionLine()', () => {
  let familyTreeInstruction;
  beforeEach(() => {
    familyTreeInstruction = new FamilyTreeInstruction(Provider.constructor());
  });
  it('Should return CHILD_ADDITION_SUCCEEDED', () => {
    const expected = message.get('SUC_1');
    const received = familyTreeInstruction.processInstructionLine(
      Provider.processInstructionLine()
    );
    expect(received).toEqual(expected);
  });
});

describe('Test - family-tree-instruction: readFile()', () => {
  let familyTreeInstruction;
  beforeEach(() => {
    familyTreeInstruction = new FamilyTreeInstruction(Provider.constructor());
  });
  it('Should return Array read from file', () => {
    const expected = [
      'ADD_CHILD Tamara Sabrina Female',
      'GET_RELATIONSHIP Reynaldo Daughter',
    ];
    const received = familyTreeInstruction.readFile(
      Provider.readFile().filePath
    );
    expect(received).toEqual(expected);
  });
  it('Should throw Error, when filePath does not exist.', () => {
    expect(() => {
      familyTreeInstruction.readFile(
        Provider.readFile().invalidPath
      );
    }).toThrowError(
      Error(message.get('ERR_9', Provider.readFile().invalidPath))
    );
  });
});

describe('Test - family-tree-instruction: processFromFile()', () => {
  let familyTreeInstruction;
  beforeEach(() => {
    familyTreeInstruction = new FamilyTreeInstruction(Provider.constructor());
  });
  it('Should return Array with outcome of the instructions processed.', () => {
    const expected = [message.get('SUC_1'), 'Sabrina'];
    const received = familyTreeInstruction.processFromFile(
      Provider.processFromFile().filePath
    );
    expect(received).toEqual(expected);
  });
});
