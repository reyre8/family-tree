const Person = require('./../src/person');

describe('Test - person: constructor()', () => {
  it('Should have properties name and gender', () => {
	  const expected = {
      name: 'Reynaldo',
      gender: 'Male'
  	}
  	const person = new Person('Reynaldo', 'Male');
    expect(person).toMatchObject(expected);
  });
  it('Should throw Error, when name is not provided.', () => {
    expect(() => {
      const person = new Person();
    }).toThrowError(
      Error('[PERSON_ERROR]-NAME_COMPULSORY')
    );
  });
  it('Should throw Error, when gender is not provided.', () => {
    expect(() => {
      const person = new Person('Reynaldo');
    }).toThrowError(
      Error('[PERSON_ERROR]-GENDER_COMPULSORY')
    );
  });
  it('Should throw Error, gender is invalid.', () => {
    expect(() => {
      const person = new Person('Reynaldo', 'Invalid-Gender');
    }).toThrowError(
      Error('[PERSON_ERROR]-INVALID_GENDER]')
    );
  });
});
