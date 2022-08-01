const CalculateCommissionFees = require('./src/index');

// Input from local file directly
// const InputData = require('./input.json');
const InputData = require('./test.json');

// From Command line argument
// const args = process.argv.slice(2);
// const InputData = args[0];
// console.log(InputData);

/* RUN THE MAIN APPLICATION */
const runApplication = async () => {
    const results = await CalculateCommissionFees(InputData);
    // results.split(',').filter(fee => console.log(fee));
    results.split(',').filter((fee) => process.stdout.write(`${fee}\n`));
};
runApplication();
