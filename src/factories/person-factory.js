const Person = require('./../entities/person');

/**
 * Generates an instance of Person.
 *
 * @param {String} name - Name of the person
 * @param {String} gender - Gender of the person
 * @return {Object} Returns an instance of Person.
 */
module.exports = (name, gender) =>
  new Person(name, gender);
