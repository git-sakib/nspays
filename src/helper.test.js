const helper = require('./helper');

// Test cases for getWeekDay
test('For Date 2022-07-13 the weekday should be 3', () => {
    expect(helper.getWeekDay('2022-07-13')).toBe(3);
});
test('For Date 2016-01-05 the weekday should be 2', () => {
    expect(helper.getWeekDay('2016-01-05')).toBe(2);
});
test('For Date 2016-01-10 the weekday should be 7', () => {
    expect(helper.getWeekDay('2016-01-10')).toBe(7);
});
test('For Date 2020-02-29 the weekday should be 6', () => {
    expect(helper.getWeekDay('2020-02-29')).toBe(6);
});

// Test cases for days between two dates
test('Days between 2016-02-15 and 2016-02-22 should be 7', () => {
    expect(helper.getDaysBetween('2016-02-15', '2016-02-22')).toBe(7);
});
test('Days between 2020-02-20 and 2020-02-29 should be 9', () => {
    expect(helper.getDaysBetween('2020-02-20', '2020-02-29')).toBe(9);
});

// Test cases for rounding cent value
test('Rounding 0.023 to closest value should be 0.03', () => {
    expect(helper.getRoundedValue(200.007)).toBe(200.01);
});
