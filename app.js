const RunApplication = require('./src/index');

// Input from local file directly
// const InputData = require('./input.json');
const InputData = require('./test.json');

// From Command line argument
const args = process.argv.slice(2);
//const InputData = args[0];
//console.log(InputData);

/* RUN THE MAIN APPLICATION */
RunApplication(InputData);
