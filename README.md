# ACME-Salary-Calculator-Javascript

Exercise

The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:

```
Monday - Friday
00:01 - 09:00 25 USD
09:01 - 18:00 15 USD
18:01 - 00:00 20 USD

Saturday and Sunday
00:01 - 09:00 30 USD
09:01 - 18:00 20 USD
18:01 - 00:00 25 USD
```

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:
```
MO: Monday
TU: Tuesday
WE: Wednesday
TH: Thursday
FR: Friday
SA: Saturday
SU: Sunday
```
**Input:** the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our two examples below.

**Output:** indicate how much the employee has to be paid

For example:
```
Case 1:
INPUT
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

OUTPUT:
The amount to pay RENE is: 215 USD
```

```
Case 2:
INPUT
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT:
The amount to pay ASTRID is: 85 USD
```

# Table of Contents
1. [Initial Approach](#initial_approach)
2. [Variables](#variables)
3. [Functions](#functions)

## Initial Approach <a name="initial_approach"></a>

I used Javascript because of the many methods that have to manage strings and arrays, specially the `split` and `toString()` that helps to change between array and string or viceversa depending on the case.`FileReader()` API reads the content of the text file. This API has the property `onload` that save the content of the file, so I used a variable to manipulate that text for later tasks.

First I need to separate each user and their respective schedules so I used a split('\n') and trim() to avoid get caught for errors if users leave a space after the text of each line. Then I used a for loop to manage each line obtained of the previous split in this text file there are six input of employees and their schedules, so this loop will execute six iterations.

Now, to get the name of the employee and the schedules for separate pieces I used `split('=')`. This will genereate an array of two values per iteration, the first value is saved in `employees` and the second in `schedules`. The variable `employees` will not be used until the end for the final message, the variable of interest for the next steps will be `schedules`.

Next, I used regular expresions to obtain specific variables. The variable `days`is obtained removing the schedules with `getPattern()` function and the regex `DELETE_SCHEDULES = /\d{2}:\d{2}-\d{2}:\d{2}/;`, `days` is used on future steps to analyze the amount will be paid for interval of schedule and work in `workWeek` and `weekends`.The variable `dailySchedule` is `schedules` without the days, this is important because I want to remove capital letters and then manipulate only the schedule ranges.

The variable `startHourAndMinute` use `getPattern()` and the regex `DELETE_CLOSING_HOUR = /-\d{2}:\d{2}/` this will obtain the first part of schedule range, in other words I obtained the value before `-`. This variable is used with the objective to obtain `startHour` and `startMinute`

The variable `closingHourAndMinute` use `getPattern()` and the regex `DELETE_START_HOUR = /\d{2}:\d{2}-/` thiw will obtain the second part of schedule range, in other words I obtained the value after `-`. This variable is used with the objective to obtain `closingHour` and `closingMinute`

The variables `startHour`, `startMinute`, `closingHour`, `closingMinute` are numeric arrays used for mathematics operations and the salary range operation, with the values of `closingHour` and `startHour` I can determine the difference of hours `hourDifference`.

The `getSalaryRange()` function receives five parameters `startHour`, `startMinute`, `closingHour`, `closingMinute` and `days`, days is compared with const `workWeek` that compares if the value of days[i] is equals to `MO || TU || WE || TH ||FR` and with const `weekEnd` if is equals to `SA || SU`. The schedule range are the same for both const only change the salary paid for that range.

The conditions for first schedule range 00:01-09:00: 

1. startHour is zero and startMinute goes from one to fifty nine, in other words startHour goes from 00:01 to 00:59
2. startHour is greater and equal than one and lower and equal than seven and startMinute goes from zero to fifty nine, in other words 01:00 to 07:59
3. startHour is equal to eight and startMinute is equal to zero, in other words 08:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour for example: 08:01-09:00 where 9:00 is the limit for the first schedule range.
4. closingHour is greater and equal than one and lower and equal than eight and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 01:00 to 08:59
5. Finally the limit case where closingHour equals to zero and minute is equals to zero, in other words closingHour is equal to 09:00

The conditions for second schedule range 09:01-18:00: 

1. startHour is nine and startMinute goes from one to fifty nine, in other words startHour goes from 09:01 to 09:59
2. startHour is greater and equal than ten and lower and equal than sixteen and startMinute goes from zero to fifty nine, in other words 10:00 to 16:59
3. startHour is equal to seventeen and startMinute is equal to zero, in other words 17:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
4. closingHour is greater and equal than ten and lower and equal than seventeen and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 10:00 to 17:59
5. Finally the limit case where closingHour equals to eighteen and minute is equals to zero, in other words closingHour is equal to 18:00

The conditions for third schedule range 18:01-00:00: 

1. startHour is eighteen and startMinute goes from one to fifty nine, in other words startHour goes from 18:01 to 18:59
2. startHour is greater and equal than nineteen and lower and equal than twenty two and startMinute goes from zero to fifty nine, in other words 19:00 to 22:59
3. startHour is equal to twenty three and startMinute is equal to zero, in other words 23:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
4. closingHour is greater and equal than nineteen and lower and equal than twenty three and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 19:00 to 23:59
5. Finally the limit case where closingHour equals to zero AM and minute is equals to zero, in other words closingHour is equal to 00:00

The format of full condition is (CONDITION1 || CONDITION2 || CONDITION3) && (CONDITION4 || CONDITION5) in each case. Then assign the proper value of salary and push that value to an array.

The variable `salary` use the function `getSalary` that takes two parameters `hourDifference` and `salaryRange`. This function multiplies the hour difference with their respective salaryRange and then sum them to get the final value.

Finally I saved the message in an array, give proper format to remove commas and pass it through textarea.value and then to `readAsText()` property of FileReader API, this will show the message in the textarea.

## Variables <a name="variables"></a>

#### employees (String)

This string is obtained after using `split('=')` and save the first parameter of the array `getEmployeesAndSchedules`. 

```
First  Iteration:  employees = RENE
Second Iteration:  employees = ASTRID
Third  Iteration:  employees = CHRIS
Fourth Iteration:  employees = KATHY
Fifth  Iteration:  employees = RODRIGO
Sixth  Iteration:  employees = ELENA
```

#### schedules (String)

This string is obtained after using `split('=')` and save the second parameter of the array `getEmployeesAndSchedules`.

```
First  Iteration:  schedules = MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
Second Iteration:  schedules = MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
Third  Iteration:  schedules = MO08:00-09:00,MO17:00-18:00,TU10:00-17:00,TH10:00-17:00,SA14:00-18:00,SU20:00-21:00
Fourth Iteration:  schedules = MO05:00-08:00,WE19:00-21:00,FR11:00-13:00,SU20:00-21:00
Fifth  Iteration:  schedules = MO05:00-08:00,WE19:00-21:00,FR11:00-13:00
Sixth  Iteration:  schedules = MO05:00-07:00,TU10:00-12:00,SA14:00-18:00,TH10:00-17:00,SU22:00-00:00
```

#### days (String Array)

A String is obtained making use of the function `getPattern()` that take two parameters an *string* and a *regex pattern*. `getPattern()` erase the pattern and replaced it with `""`. The pattern used is `DELETE_SCHEDULES = /\d{2}:\d{2}-\d{2}:\d{2}/;` ,the result is a *string* of days separated by commas `MO,TU,TH,SA,SU` , the string is split by *commas* and then days variable becomes an **array**.

```
First  Iteration:  days = ["MO", "TU", "TH", "SA", "SU"]
Second Iteration:  days = ["MO", "TH", "SU"]
Third  Iteration:  days = ["MO", "MO", "TU", "TH", "SA", "SU"]
Fourth Iteration:  days = ["MO", "WE", "FR", "SU"]
Fifth  Iteration:  days = ["MO", "WE", "FR"]
Sixth  Iteration:  days = ["MO", "TU", "SA", "TH", "SU"]
```

#### dailySchedule (String)

This variable is obtained using `getPattern()` with a *string* and the *regex pattern* `DELETE_DAYS = /[A-Z]/;` as parameters then return a **string** as result. This function will erase all days (MO,TU,WE,TH,FR,SA,SU) of the string and just keep the daily schedules.

```
First  Iteration:  dailySchedule = 10:00-12:00,10:00-12:00,01:00-03:00,14:00-18:00,20:00-21:00
Second Iteration:  dailySchedule = 10:00-12:00,12:00-14:00,20:00-21:00
Third  Iteration:  dailySchedule = 08:00-09:00,17:00-18:00,10:00-17:00,10:00-17:00,14:00-18:00,20:00-21:00
Fourth Iteration:  dailySchedule = 05:00-08:00,19:00-21:00,11:00-13:00,20:00-21:00
Fifth  Iteration:  dailySchedule = 05:00-08:00,19:00-21:00,11:00-13:00
Sixth  Iteration:  dailySchedule = 05:00-07:00,10:00-12:00,14:00-18:00,10:00-17:00,22:00-00:00
```

#### startHourAndMinute (String)

This variable takes the first part of the *dailyschedule*, in other words take the part before `-`. This variable is obtained using `getPattern()` with the *string dailySchedule* and the *regex pattern* `DELETE_CLOSING_HOUR = /-\d{2}:\d{2}/` as parameters and then return a **string** as result.

```
First  Iteration:  startHourAndMinute = 10:00,10:00,01:00,14:00,20:00 
Second Iteration:  startHourAndMinute = 10:00,12:00,20:00
Third  Iteration:  startHourAndMinute = 08:00,17:00,10:00,10:00,14:00,20:00
Fourth Iteration:  startHourAndMinute = 05:00,19:00,11:00,20:00
Fifth  Iteration:  startHourAndMinute = 05:00,19:00,11:00
Sixth  Iteration:  startHourAndMinute = 05:00,10:00,14:00,10:00,22:00
```

#### closingHourAndMinute (String)

This variable takes the second part of the *dailyschedule*, in other words take the part after `-`. This variable is obtained using `getPattern()` with the *string dailySchedule* and the *regex pattern* `DELETE_START_HOUR = /\d{2}:\d{2}-/` as parameters and then return a **string** as result.

```
First  Iteration:  closinHourAndMinute = 12:00,12:00,03:00,18:00,21:00
Second Iteration:  closinHourAndMinute = 12:00,14:00,21:00
Third  Iteration:  closinHourAndMinute = 09:00,18:00,17:00,17:00,18:00,21:00
Fourth Iteration:  closinHourAndMinute = 08:00,21:00,13:00,21:00
Fifth  Iteration:  closinHourAndMinute = 08:00,21:00,13:00
Sixth  Iteration:  closinHourAndMinute = 07:00,12:00,18:00,17:00,00:00
```

#### startHour (Numeric Array)

This variable takes the hour of `startHourAndMinute`, in other words the part before `:` . This variable is obtained using `getHour()` with the *string* startHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 23 and represent the hours.

```
First  Iteration:  startHour = [10, 10, 1, 14, 20]
Second Iteration:  startHour = [10, 12, 20]
Third  Iteration:  startHour = [8, 17, 10, 10, 14, 20]
Fourth Iteration:  startHour = [5, 19, 11, 20]
Fifth  Iteration:  startHour = [5, 19, 11]
Sixth  Iteration:  startHour = [5, 10, 14, 10, 22]
```

#### startMinute (Numeric Array)

This variable takes the minutes of `startHourAndMinute`, in other words the part after `:` . This variable is obtained using `getMinute()` with the *string* startHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 59 and represent the minutes.

```
First  Iteration:  startMinute = [0, 0, 0, 0, 0]
Second Iteration:  startMinute = [0, 0, 0]
Third  Iteration:  startMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  startMinute = [0, 0, 0, 0]
Fifth  Iteration:  startMinute = [0, 0, 0]
Sixth  Iteration:  startMinute = [0, 0, 0, 0, 0]
```

#### closingHour (Numeric Array)

This variable takes the hour of `closingHourAndMinute`, in other words the part before `:` . This variable is obtained using `getHour()` with the *string* closingHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 23 and represent the hours. This is the same process as `startHour` considering the other interval of the schedule.

```
First  Iteration:  closingHour = [12, 12, 3, 18, 21] 
Second Iteration:  closingHour = [12, 14, 21]
Third  Iteration:  closingHour = [9, 18, 17, 17, 18, 21]
Fourth Iteration:  closingHour = [8, 21, 13, 21]
Fifth  Iteration:  closingHour = [8, 21, 13]
Sixth  Iteration:  closingHour = [7, 12, 18, 17, 0]
```

#### closingMinute (Numeric Array)

This variable takes the minutes of `closingHourAndMinute`, in other words the part after `:` . This variable is obtained using `getMinute()` with the *string* closingHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 59 and represent the minutes. This is the same process as `startMinute` considering the other interval of the schedule.

```
First  Iteration:  closingMinute = [0, 0, 0, 0, 0]
Second Iteration:  closingMinute = [0, 0, 0]
Third  Iteration:  closingMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  closingMinute = [0, 0, 0, 0]
Fifth  Iteration:  closingMinute = [0, 0, 0]
Sixth  Iteration:  closingMinute = [0, 0, 0, 0, 0]
```

#### hourDifference (Numeric Array)

This variable is obtained with the function `hourSubstraction()` that takes the arrays `closingHour` and `startHour` as parameters, applies the substraction and then return an **array of numbers** as the answer.

```
First  Iteration:  hourDifference = [2, 2, 2, 4, 1]
Second Iteration:  hourDifference = [2, 2, 1]
Third  Iteration:  hourDifference = [1, 1, 7, 7, 4, 1]
Fourth Iteration:  hourDifference = [3, 2, 2, 1]
Fifth  Iteration:  hourDifference = [3, 2, 2]
Sixth  Iteration:  hourDifference = [2, 2, 4, 7, 2]
```

#### salaryRange (Numeric Array)

This variable is obtained with the function `getSalaryRange()` that takes `startHour`,`startMinute`,`closingHour`,`closingMinute` and `days` as parameters and return an **array** with the specific salary for that schedule range and day.

```
First  Iteration:  salaryRange = [15, 15, 25, 20, 25]
Second Iteration:  salaryRange = [15, 15, 25]
Third  Iteration:  salaryRange = [25, 15, 15, 15, 20, 25]
Fourth Iteration:  salaryRange = [25, 20, 15, 25]
Fifth  Iteration:  salaryRange = [25, 20, 15]
Sixth  Iteration:  salaryRange = [25, 15, 20, 15, 25]
```

#### salary (Number)

This variable is obtained multiplying `salaryRange` and `hourDifference` using the function `getSalary()`. This value is **number** and changes in each iteration.

```
First  Iteration:  salary = 215
Second Iteration:  salary =  85
Third  Iteration:  salary = 355
Fourth Iteration:  salary = 170
Fifth  Iteration:  salary = 145
Sixth  Iteration:  salary = 315
```

#### Message Management

The variable `employeeSalaryResult` saves the message `The amount to pay to employee ${employees} is ${salary} USD\n` for each iteration using `push`, then convert to string with `toString()`, replace each *comma* with *space* and save it in **textarea.value**. Finally using the property `readAsText` of FileReader() the content of `textarea.value` is shown in the textarea. 


## Functions <a name="functions"></a>

#### deletePattern(textFile="", pattern)

Take a `string` and a `regular expresion` and delete that pattern of the string. Then the formatted string is returned.

**Parameters**

`textfile` This is the string that will be processed.
`pattern` This is the pattern that will be passed to RegExp() function. The `ig` flags indicate to ignore capitalization and look for all matches. 

**Return value**
 
 Returns the same `string` after erasing the regex pattern passed as input.

```js
const deletePattern = (textFile = "", pattern) => {
    return textFile.replace(new RegExp(pattern,"ig"),"");
}
```

#### getHour(schedules="")

Return a numeric array with the hours of the schedules string.

```js
const getHour = (textFile = "") => {
    textFile = textFile.split(/[:,]/);
    for (var i = 0; i < textFile.length; i++){
        textFile.splice(i + 1, 1);
    } 
    return textFile.map(Number);
}
```

**Parameters**

`schedules` This is the string to be manipulated. Has the form of HH:MM,HH:MM,HH:MM,HH:MM 

**Return value**

Returns a numeric array with the even part of the array formed after the split(/[:,]/). 

**Example:**

*schedules* variable
```
10:50,10:00,01:00,14:00,20:00
```
*schedules* after the split with the regex /[:,]/
```
["10", "50", "10", "00", "01", "00", "14", "00", "20", "00"]
```
Array index starts in 0 and then increases. `splice(i+1,1)` will drop the index 1,3,5,7,9 and then convert string array to number array with `map` function.
```
[10, 10, 1, 14, 20]
```

#### getMinutes(schedule="")

```
// get Minutes from format HH:MM
const getMinutes = (textFile = "") => {
    textFile = textFile.split(/[:,]/);
    for(var i = 0; i < textFile.length; i++){
        textFile.splice(i,1);
    }
    //elimina la parte par
    return textFile.map(Number);
}
```

**Parameters**

`schedules` This is the string to be manipulated. Has the form of HH:MM,HH:MM,HH:MM,HH:MM 

**Return value**

Returns a numeric array with the odd part of the array formed after the split(/[:,]/). 

**Example:**

*schedules* variable
```
10:50,10:00,01:00,14:00,20:00
```
*schedules* after the split with the regex /[:,]/
```
["10", "50", "10", "00", "01", "00", "14", "00", "20", "00"]
```
Array index starts in 0 and then increases. `splice(i,1)` will drop the index 0,2,4,6,8 and then convert string array to number array with `map` function.
```
[50, 0, 0, 0, 0]
```


