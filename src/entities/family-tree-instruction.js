const fs = require('fs');
const FamilyTreeOperation = require('./family-tree-operation');
const message = require('./../libs/message');
const config = require('./../../config');

/**
 * Class that controls the instructions performed
 * on a FamilyTreeOperation Object
 */
class FamilyTreeInstruction {
  /**
   * Class constructor
   *
   * @param {Object} familyTreeOperation to be used,
   * in order to process instructions
   */
  constructor(familyTreeOperation) {
    if (this.validate(familyTreeOperation)) {
      this.familyTreeOperation = familyTreeOperation;
    }
  }

  /**
   * Process the instructions on a given file, as tree operation.
   * Each line of the file is considered an operation to be performed.
   *
   * @param {String} filePath - The path of the file
   * @return {Array} The process outcome
   */
  processFromFile(filePath) {
    const instructions = this.readFile(filePath);
    return instructions.map((instruction) =>
      this.processInstructionLine(instruction));
  }

  /**
   * Reads the content of a file, given a filePath.
   * @param {String} filePath - The path of the file
   * @return {Array} Collection with each line in the file
   */
  readFile(filePath) {
    if (!fs.existsSync(filePath)) {
      throw Error(message.get('ERR_9', filePath));
    }

    return fs
      .readFileSync(filePath, config.fileEncoding)
      .split('\n')
      .filter(Boolean);
  }

  /**
   * Processes the given instruction line, as an operation
   * @param {String} line - instruction line
   * @return {String} Operation outcome
   */
  processInstructionLine(line) {
    const operation = this.formatInstructionLine(line);
    return this.familyTreeOperation.execute(operation);
  }

  /**
   * Splits the instruction line by the separator ' ', excluding spaces in
   * double quotes (i.e. "foo bar"). The function returns an array with
   * the elements returned from the split.
   * @param {String} - line instruction line
   * @return {Array} Instructions as an array
   */
  formatInstructionLine(line) {
    if (typeof line !== 'string') throw Error(message.get('ERR_10'));
    const matches = line.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (Array.isArray(matches)) {
      return matches.map((item) =>
        item.replace(/"/g, ''));
    }

    return [];
  }

  /**
   * Verifies if the property familyTreeOperation is valid
   *
   * @param {Object} familyTreeOperation
   * @return {Boolean} true if no errors, otherwise, it throws an Error
   */
  validate(familyTreeOperation) {
    if (!familyTreeOperation) {
      throw Error(message.get('ERR_11'));
    }

    if (!(familyTreeOperation instanceof FamilyTreeOperation)) {
      throw Error(message.get('ERR_12'));
    }

    return true;
  }
}

module.exports = FamilyTreeInstruction;
