const { test, expect } = require('@jest/globals')
const FormatText = require ("./formatText")

test('Delete the daily schedule and only leave days', () =>{
    const DAILY_SCHEDULES = /\d+:\d+-\d+:\d+/; 
    const formatted = new FormatText("MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",DAILY_SCHEDULES);
    const expected = "MO,TH,SU";
    expect(formatted.deletePattern()).toBe(expected);
})

test('Delete the days and only leave dayly schedules', () =>{
    const DAYS = /[A-Z]/;
    const formatted = new FormatText("MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",DAYS);
    const expected = "10:00-12:00,12:00-14:00,20:00-21:00";
    expect(formatted.deletePattern()).toBe(expected);
})

test('Delete the hours after the - to obtain the startHourAndMinute variable', () =>{
    const CLOSING_HOUR = /-\d+:\d+/;
    const formatted = new FormatText("10:00-12:00,12:00-14:00,20:00-21:00",CLOSING_HOUR);
    const expected = "10:00,12:00,20:00";
    expect(formatted.deletePattern()).toBe(expected);
})

test('Delete the hours before the - to obtain the closingHourAndMinute variable', () =>{
    const START_HOUR = /\d+:\d+-/;
    const formatted = new FormatText("10:00-12:00,12:00-14:00,20:00-21:00",START_HOUR);
    const expected = "12:00,14:00,21:00";
    expect(formatted.deletePattern()).toBe(expected);
})

