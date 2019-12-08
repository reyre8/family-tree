const processFile = require('./src/process-file');
const config = require('./config');

// Get filePath from arguments or use default
const filePath = process.argv[2] || config.defaultInput;

// Parse the file and process the command
const result = processFile(filePath);

// Print the output
result.map((lineResult) =>
  console.log(lineResult));
