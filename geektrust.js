const fs = require('fs');
const readline = require('readline');
const init = require('./init');
const Tree = require('./src/tree');
const TreeOperation = require('./src/treeOperation');

// Define file path to be processed
const args = process.argv.slice(2);
var path = (args.length>0)?args[0]:'./data/default-input.txt';

// Verify if file exists
if (!fs.existsSync(path)) {
  console.log(`FILE_NOT_FOUND: ${path}`);
  return;
}

// Load initial tree
var tree = init.loadTree();
var treeOperation = new TreeOperation(tree);

// Initialise readStream
const readInterface = readline.createInterface({
    input: fs.createReadStream(path)
});

// Evaluate lines on the file as operations
readInterface.on('line', function(line) {
  var operation = line.split(/(\s+)/).filter(function(e) {return e.trim().length > 0;});
  var result = treeOperation.execute(operation);
  console.log(result);
});