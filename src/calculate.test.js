const calculate = require('./calculate');

test('Cash-in amount 200.00 EUR (rate - 0.03%, max 5 EUR) - Expected Fee 0.06', () => {
    expect(calculate.calculateCashInFees(200.00,0.03,5)).toBeCloseTo(0.06);
});

// test('Cash-in amount 1000.00 EUR (rate - 0.03%, max 5 EUR) - Expected Fee 5.00', () => {
//     expect(calculateCashInFees(1000000.00,0.03,5)).toBeCloseTo(5.00);
// });
