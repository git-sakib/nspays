const services = require('./services');

const args = process.argv.slice(2);
const INPUT_FILE = args[0];
console.log(INPUT_FILE);

function RunApplication() {
    services.fetchCashInRate();
}

module.exports = RunApplication;
