const initFamilyTree = require('./init-family-tree');
const config = require('./../config');
const FamilyTreeInstructionFactory =
  require('./factories/family-tree-instruction-factory');

module.exports = () => {
  try {
    // Get filePath from arguments or use default
    const filePath = process.argv[config.fileArgIndex] || config.defaultInput;

    // Load initial tree
    const familyTree = initFamilyTree();
    const familyTreeInstruction = FamilyTreeInstructionFactory(familyTree);

    // Load tree with initial data
    familyTreeInstruction.processFromFile(config.initialInput);

    // Run input file with instructions
    const result = familyTreeInstruction.processFromFile(filePath);
    result.map((lineResult) =>
      console.log(lineResult));
  } catch (error) {
    console.log(error.toString());
  }
};
