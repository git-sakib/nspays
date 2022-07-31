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
test('For Date 2016-02-15 the weekday should be 1', () => {
    expect(helper.getWeekDay('2016-02-15')).toBe(1);
});

// Test cases for days between two dates
test('Days between 2016-02-15 and 2016-02-22 should be 7', () => {
    expect(helper.getDaysBetween('2016-02-15', '2016-02-22')).toBe(7);
});