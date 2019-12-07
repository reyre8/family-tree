const PersonFactory = require('./../../src/factories/person-factory');
const Person = require('./../../src/entities/person');
const Provider = require('./provider/person-factory-provider');

describe('Test - PersonFactory', () => {
  it('Should return an instance of Person', () => {
    const person = PersonFactory(Provider.params().name, Provider.params().gender);
    expect(person).toBeInstanceOf(Person);
  });
});
