const { test, expect } = require("@jest/globals");
const FormatSalaryCalculator = require ("./formatSalaryCalculator")

//the constructor of FormatSalaryCalculator receives in this order closingHour,startHour,closingMinutes,startMinutes,days.
//Case 1: Hour Difference = closingHour - startHour
test('Evaluate the difference of hours, closingMinutes and startMinutes have same values', () =>{
    const formatted = new FormatSalaryCalculator([12, 12, 3, 18, 21],[10, 10, 1, 14, 20],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]);
    const expected = [2,2,2,4,1];
    expect(formatted.hourSubstraction()).toEqual(expected);
})
//Case 2: Hour Difference = closingHour - startHour -1 for first element
test('Evaluate the difference of hours in this case closingMinutes is not equal to startMinutes so difference will be substratec by one', () =>{
    const formatted = new FormatSalaryCalculator([12, 12, 3, 18, 21],[10, 10, 1, 14, 20],[24, 0, 0, 0, 0],[25, 0, 0, 0, 0]);
    const expected = [1,2,2,4,1];
    expect(formatted.hourSubstraction()).toEqual(expected);
})

//Case 3: Hour Difference = closingHour - startHour and 00:00 is considered as 24 for the difference calculation.
test('Midnight case 0 is treated as 24 to obtain the difference of hours, in this case closingMinutes is equal to startMinutes', () =>{
    const formatted = new FormatSalaryCalculator([0, 12, 3, 18, 21],[21, 10, 1, 14, 20],[25, 0, 0, 0, 0],[25, 0, 0, 0, 0]);
    const expected = [3,2,2,4,1];
    expect(formatted.hourSubstraction()).toEqual(expected);
})

//Case 4: Hour Difference = closingHour -startHour -1 and 00:00 is considered as 24 for the difference calculation.
test('Midnight case 0 is treated as 24 to obtain the difference of hours, in this case closingMinutes is not equal to startMinutes', () =>{
    const formatted = new FormatSalaryCalculator([0, 12, 3, 18, 21],[21, 10, 1, 14, 20],[0, 0, 0, 0, 0],[15, 0, 0, 0, 0]);
    const expected = [2,2,2,4,1];
    expect(formatted.hourSubstraction()).toEqual(expected);
})


//Testing getSalaryRange() with different values
//Case 1: considering [21:00-0:00,10:00-12:00,01:00-03:00,14:00-18:00] 00:00 Considered
test('obtain the amount to pay an employee based on day and schedule', () =>{
    const formatted = new FormatSalaryCalculator([0, 12, 3, 18],[21, 10, 1, 14],[0, 0, 0, 0],[0, 0, 0, 0],["MO","TU","SA","SU"]);
    const expected = [20,15,30,20];
    expect(formatted.getSalaryRange()).toEqual(expected);
})

//Case 2: Considering [08:00-09:00,17:00-18:00,10:00-17:00,10:00-17:00,14:00-18:00,20:00-21:00] MO repeated with other schedule
test('obtain the amount to pay an employee based on day and schedule', () =>{
    const formatted = new FormatSalaryCalculator([9, 18, 17, 17, 18, 21],[8, 17, 10, 10, 14, 20],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],["MO", "MO", "TU", "TH", "SA", "SU"]);
    const expected = [25, 15, 15, 15, 20, 25];
    expect(formatted.getSalaryRange()).toEqual(expected);
})

//Case 3: Considering [05:00-07:00,10:00-12:00,14:00-18:00,10:00-17:00,22:00-00:00]
test('obtain the amount to pay an employee based on day and schedule', () =>{
    const formatted = new FormatSalaryCalculator([7, 12, 18, 17, 23],[5, 10, 14, 10, 22],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],["MO", "TU", "SA", "TH", "SU"]);
    const expected = [25, 15, 20, 15, 25];
    expect(formatted.getSalaryRange()).toEqual(expected);
})

//ERROR VALIDATION
//Case 4: Exceeding the limit of schedules 00:01-09:00 considering [05:00-09:01,10:00-12:00,14:00-18:00,10:00-17:00,22:00-00:00]
//First element fails validation making all the array does not shown in screen even if the other elements achieve conditions.
test('obtain the amount to pay an employee based on day and schedule', () =>{
    const formatted = new FormatSalaryCalculator([9, 12, 18, 17, 23],[5, 10, 14, 10, 22],[1, 0, 0, 0, 0],[0, 0, 0, 0, 0],["MO", "TU", "SA", "TH", "SU"]);
    const expected = [15,20,15,25]; //The first element doesn't match the rules, but the other elements do.
    expect(formatted.getSalaryRange()).toEqual(expected);
})

//If any of the cases fails the output won't be shown in screen but the that validation will appear as blank
//Case 5: Only the first element achieve the conditions but the other elements doesn't. The array won't be shown by screen.
test('obtain the amount to pay an employee based on day and schedule', () =>{
    const formatted = new FormatSalaryCalculator([9, 9, 9, 9, 9],[5, 5, 5, 5, 5],[0, 10, 10, 10, 10],[0, 0, 0, 0, 0],["MO", "MO", "SU", "SU", "SU"]);
    const expected = [25,];
    expect(formatted.getSalaryRange()).toEqual(expected);
})

//getSalary() function evaluation receives hourDifferce and salaryRange arrays, but depends on the other variables.
test('obtain the total salary an employee will be paid in the week', () =>{
    const formatted = new FormatSalaryCalculator([8, 21, 13],[5, 19, 11],[0, 0, 0],[0, 0, 0],["MO", "WE", "FR"]) 
    const expected = 145;
    expect(formatted.getSalary([3, 2, 2],[25, 20, 15])).toEqual(expected);   
})
