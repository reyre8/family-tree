const message = require('./../libs/message');

const GENDER_MALE = 'Male';
const GENDER_FEMALE = 'Female';

/**
 * Class that controls the attributes of a person
 */
class Person {
  /**
   * Class constructor
   *
   * @param {String} name - Person name
   * @param {String} gender - Person gender [Male, Female]
   */
  constructor(name, gender) {
    if (this.validate(name, gender)) {
      this.name = name;
      this.gender = gender;
    }
  }

  /**
   * Verifies whether a person is male or not
   *
   * @return {Boolean} If person is Male returns true, otherwise false
   */
  isMale() {
    return this.gender === GENDER_MALE;
  }

  /**
   * Verifies whether a person is female or not
   *
   * @return {Boolean} If person is Male returns true, otherwise false
   */
  isFemale() {
    return this.gender === GENDER_FEMALE;
  }

  /**
   * Verifies if the properties member and partner are valid
   *
   * @param {String} name - The name of the person
   * @param {String} gender - [Female, Male]
   * @return {Boolean} true if there are no errors, otherwise,
   * it throws an Error
   */
  validate(name, gender) {
    if (!name) {
      throw Error(message.get('ERR_20'));
    }

    if (!gender) {
      throw Error(message.get('ERR_21'));
    }

    if (![GENDER_FEMALE, GENDER_MALE].includes(gender)) {
      throw Error(message.get('ERR_22'));
    }

    return true;
  }
}

module.exports = Person;
