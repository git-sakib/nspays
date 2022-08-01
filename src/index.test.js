const CalculateCommissionFees = require('./index');
const dataset1 = require('../dataset/dataset1.json');
const dataset2 = require('../dataset/dataset2.json');

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
