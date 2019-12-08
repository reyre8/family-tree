const Person = require('./../../src/entities/person');
const message = require('./../../src/libs/message');

/* eslint-disable no-new */
describe('Test - person: constructor()', () => {
  it('Should have properties name and gender', () => {
    const expected = {
      name: 'Reynaldo',
      gender: 'Male',
    };
    const person = new Person('Reynaldo', 'Male');
    expect(person).toMatchObject(expected);
  });
  it('Should throw Error, when name is not provided.', () => {
    expect(() => {
      new Person();
    }).toThrowError(Error(message.get('ERR_20')));
  });
  it('Should throw Error, when gender is not provided.', () => {
    expect(() => {
      new Person('Reynaldo');
    }).toThrowError(Error(message.get('ERR_21')));
  });
  it('Should throw Error, gender is invalid.', () => {
    expect(() => {
      new Person('Reynaldo', 'Invalid-Gender');
    }).toThrowError(Error(message.get('ERR_22')));
  });
});
