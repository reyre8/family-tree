const Person = require('./../entities/person');

module.exports = (name, gender) => {
  return new Person(name, gender);
}
