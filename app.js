const fs = require('fs');
const CalculateCommissionFees = require('./src/index');
const services = require('./src/services');

// Input from local file directly
// const InputData = require('./input.json');

// RUN THE MAIN APPLICATION
const runApplication = async () => {
    // Get Input File Path From Command line argument
    const args = process.argv.slice(2);
    const InputDataPath = args[0];
    let InputData;

    // Check if File Path is a URL
    if (InputDataPath.startsWith('http')) {
        InputData = await services.fetchInputData(InputDataPath);
    } else {
        const fileData = fs.readFileSync(args[0], 'utf8');
        InputData = JSON.parse(fileData);
    }

    // Calculate Commission Fees from Input Data
    const results = await CalculateCommissionFees(InputData);
    // Process Results for output
    results.split(',').filter((fee) => process.stdout.write(`${fee}\n`));
};
runApplication();
