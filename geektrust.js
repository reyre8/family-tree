const fs = require('fs');
const readline = require('readline');
const init = require('./init');
const FamilyTreeOperationFactory = require('./src/factories/family-tree-operation-factory');

// Define file path to be processed
const args = process.argv.slice(2);
var path = (args.length>0)?args[0]:'./data/default-input.txt';

// Verify if file exists
if (!fs.existsSync(path)) {
  console.log(`FILE_NOT_FOUND: ${path}`);
  return;
}

// Initialise readStream
const readInterface = readline.createInterface({
    input: fs.createReadStream(path)
});

// Load initial tree
var tree = init.loadTree();
var familyTreeOperation = FamilyTreeOperationFactory(tree);

// Evaluate lines on the file as operations
readInterface.on('line', function(line) {
  var operation = line.split(/(\s+)/).filter(function(e) {return e.trim().length > 0;});
  try {
    var result = familyTreeOperation.execute(operation);
    console.log(result);
  } catch(error) {
    console.log(error.toString());
  }
});