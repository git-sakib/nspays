const CalculateCommissionFees = require('./index');
const dataset1 = require('../testdata/dataset1.json');
const dataset2 = require('../testdata/dataset2.json');
const dataset3 = require('../testdata/dataset3.json');
const dataset4 = require('../testdata/dataset4.json');

// Data Set 1
test('Input Dataset 1', async () => {
    const data = await CalculateCommissionFees(dataset1.input);
    expect(data).toBe(dataset1.output);
});

// Data Set 2
test('Input Dataset 2', async () => {
    const data = await CalculateCommissionFees(dataset2.input);
    expect(data).toBe(dataset2.output);
});

// Data Set 3
test('Input Dataset 3', async () => {
    const data = await CalculateCommissionFees(dataset3.input);
    expect(data).toBe(dataset3.output);
});

// Data Set 4
test('Input Dataset 4', async () => {
    const data = await CalculateCommissionFees(dataset4.input);
    expect(data).toBe(dataset4.output);
});
