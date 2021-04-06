const { test, expect } = require("@jest/globals")
const FormatTime = require ("./formatTime")

test('Get hours of a string with the format HH:MM', ()=>{
    const formatted = new FormatTime("10:00,12:00,20:00")
    const expected = [10, 12, 20];
    expect(formatted.getHour()).toEqual(expected);
})

test('Get minutes of a string with the format HH:MM', ()=>{
    const formatted = new FormatTime("10:00,12:50,20:00")
    const expected = [0, 50, 0];
    expect(formatted.getMinutes()).toEqual(expected);
})