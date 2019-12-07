const init = require('./init');
const config = require('./config');
const FamilyTreeInstructionFactory = require('./src/factories/family-tree-instruction-factory');

// Define file path to be processed
const args = process.argv.slice(2);
let filePath = (args.length>0)?args[0]:config.defaultInput;

// Load initial tree
let familyTree = init.loadTree();
let familyTreeInstruction = FamilyTreeInstructionFactory(familyTree);
const result = familyTreeInstruction.processFromFile(filePath);
result.map((lineResult) => console.log(lineResult));
