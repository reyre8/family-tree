const InitFamilyTreeInstruction = require('./init-family-tree-instruction');
const config = require('./../config');

/**
 * Process the file on a tree instruction object
 *
 * @param {String} filePath - The path of the file to be processed
 * @return {Array} The outcome of the instructions processed
 */
module.exports = (filePath) => {
  // Load initial tree instruction
  const familyTreeInstruction = InitFamilyTreeInstruction();

  // Load tree with initial data
  familyTreeInstruction.processFromFile(config.initialInput);

  // Run input file with instructions
  return familyTreeInstruction.processFromFile(filePath);
};
