const genders = ['Male', 'Female']

/**
 * Class that controls the attributes of a person
 *
 * @param {String} name Person name
 * @param {String} gender Person gender [Male, Female]
 */
function Person(name, gender) {
  this.name = name;
  if(!genders.includes(gender)) {
    throw Error('PERSON_ERROR[INVALID_GENDER]-ONLY["Male"|"Female"]');
  } else {
    this.gender = gender;  
  }
}

/**
 * Verifies whether a person is male or not
 *
 * @return {Boolean} If person is Male returns true, otherwise false
 */
Person.prototype.isMale = function() {
  return (this.gender === genders[0]);
}

/**
 * Verifies whether a person is female or not
 *
 * @return {Boolean} If person is Male returns true, otherwise false
 */
Person.prototype.isFemale = function() {
  return (this.gender === genders[1]);
}

module.exports = Person;