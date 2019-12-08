const initFamilyTree = require('./init-family-tree');
const config = require('./config');
const FamilyTreeInstructionFactory =
  require('./src/factories/family-tree-instruction-factory');

// Define file path to be processed
const args = process.argv.slice(2);
const filePath = args.length > 0 ? args[0] : config.defaultInput;

// Load initial tree
const familyTree = initFamilyTree();
const familyTreeInstruction = FamilyTreeInstructionFactory(familyTree);

// Load tree with initial data
familyTreeInstruction.processFromFile(config.initialInput);

// Run input file with instructions
const result = familyTreeInstruction.processFromFile(filePath);
result.map((lineResult) =>
  console.log(lineResult));
