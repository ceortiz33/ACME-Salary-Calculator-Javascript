# ACME-Salary-Calculator-Javascript

# Table of Contents

1. [Exercise](#exercise)
2. [How to run locally?](#local)
3. [Architecture](#architecture)
4. [Initial Approach](#initial_approach)
5. [Constants and Global Variables](#constants)
6. [Functions and Classes](#functions)
7. [Variables](#variables)
8. [Testing with Jest](#testing)

## Exercise<a name="exercise"></a>

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



## How to run locally?<a name="local"></a>

1. Download [Git](https://git-scm.com/download).

2. Download the repository `git clone https://github.com/ceortiz33/ACME-Salary-Calculator-Javascript.git`

3. Open the folder and double clic `index.html`, Select any browser you want.

4. You can create your custom `input.txt` file if you want, following the rules that are shown in `index.html`. A predefined `input.txt` file is attached in the repository, so you can use it for testing.

5. Upload the `input.txt` and watch the results.

## Architecture <a name="architecture"></a>

The program is structured in three sections:

- constants and global variables.
- functions and classes.
- main code.

The exercise is solved using OOP to create objects that execute functions of the three classes: FormatText,FormatTime and FormatSalaryCalculator. The program flow goes from the raw text obtained from the txt file, then is split and take pieces of the text to get variables, these variables will be used to get more variables until get hours and minutes. Hour and minutes are useful for the mathematics part where the logic of salary assignment is applied.  

The writing rules used are:

- constants use UpperCase and SnakeCase between each word.
- classes use PascalCase.
- functions and variables inside the code use camelCase.
- function declaration uses ECMA Script 6. function declaration use arrow functions
- Use of descriptive name for functions even if the name is longer.
- Use descriptive name for variables in the code.
- Change the parameters functions receive to get an idea of what expect to be the input.
- Write comments only to describe specific actions and help other people to understand code.

Constant section and global variables:

- regex used to delete pattern
- global variables of DOM of button and textarea
- array to save the output of the exercise.

Classes section:

- Classes are separated in three groups classes that format text, classes that obtain hours and minutes, and classes that do the mathematic logic to solve the problem.
- mathemathics operations use hour and minutes to get results.

Extra validations
- Zero hour (00:00) is formatted to 24 to get the difference of hours and then change back to 0
- Minutes are considered in hourSubstraction function to validate that we got 'real' hours. If an user has MO10:50-11:00 the hourSubstraction will be zero because there are not 60 minutes of difference. The operation compare if closingMinute is equals to startMinute then proceeds normally, otherwise the houSubstraction will decrease in one.
- Use of trim() to avoid spaces be considered in split functions at the end of each input.
- Hour validation in getSalaryRange() consider the limit values for startHour, in other words 00:01-09:00 will be split in three conditions for startHour. 00:01 to 00:59, 01:00-07:59, 08:00 for first schedule.
- Hour validation in getSalaryRange() consider the limit values for startHour, in other words 00:01-09:00 will be split in three conditions for startHour. 09:01 to 09:59, 10:00-16:59, 17:00 for second schedule.
- Hour validation in getSalaryRange() consider the limit values for startHour, in other words 00:01-09:00 will be split in three conditions for startHour. 18:01 to 18:59, 19:00-22:59, 23:00 for third schedule.
- Hour validation in getSalaryRange for closingHour consider a minimum of one hour of difference between the startHour first limit, so the first case will be 01:00 for first schedule range, 10:00 for the second range and 19:00 for the last range.
- 8:00,17:00,23:00 are the limit values for startHour because I consider that must be at least one hour of difference between the second schedule limit 09:00,18:00,00:00

The main code structure is:
- Read file with FileReader()
- Separate the content in each line.
- For loop to obtain variables
- Get employee and schedules
- Use schedules variable to get startHourAndMinute and closingHourAndMinute
- Get the Hour and Minute from startHourAndMinute and closingHourAndMinute.
- Get the difference of hours
- Get the salary range per day
- Get the amount to pay to the employee
- Show results in textarea.

## Initial Approach <a name="initial_approach"></a>

I used Javascript because of the many methods that have to manage strings and arrays, specially the `split` and `toString()` that helps to change between array and string or viceversa depending on the case.`FileReader()` API reads the content of the text file. This API has the property `onload` that save the content of the file, so I used a variable to manipulate that text for later tasks.

First I need to separate each text line so I used a split('\n') and trim() to avoid get caught for errors if users leave a space after the text of each line. Then I used a for loop to manage each line obtained of the previous split in this text file there are five input of employees and their schedules, so this loop will execute five iterations.

Now, to get the name of the employee and the schedules for separate pieces I used `split('=')`. This will genereate an array of two values per iteration, the first value is saved in `employees` and the second in `schedules`. The variable `employees` will not be used until the end for the final message, the variable of interest for the next steps will be `schedules`.

Next, I used regular expresions to obtain specific variables. The variable `days`is obtained removing the schedules with `getPattern()` function and the regex `DELETE_SCHEDULES = /\d+:\d+-\d+:\d+/;`, `days` is used on future steps to analyze the amount will be paid for interval of schedule and work in `workWeek` and `weekends`.The variable `dailySchedule` is `schedules` without the days, this is important because I want to remove capital letters and then manipulate only the schedule ranges.

The variable `startHourAndMinute` use `getPattern()` and the regex `DELETE_CLOSING_HOUR = /-\d+:\d+/` this will obtain the first part of schedule range, in other words I obtained the value before `-`. This variable is used with the objective to obtain `startHour` and `startMinute`

The variable `closingHourAndMinute` use `getPattern()` and the regex `DELETE_START_HOUR = /\d+:\d+-/` thiw will obtain the second part of schedule range, in other words I obtained the value after `-`. This variable is used with the objective to obtain `closingHour` and `closingMinute`

The variables `startHour`, `startMinute`, `closingHour`, `closingMinute` are numeric arrays used for mathematics operations and the salary range operation, with the values of `closingHour` and `startHour` I can determine the difference of hours `hourDifference`.

The `getSalaryRange()` function receives five parameters `startHour`, `startMinute`, `closingHour`, `closingMinute` and `days`, days is compared with const `workWeek` that compares if the value of this.days[i] is equals to `MO || TU || WE || TH ||FR` and const `weekEnd` if is equals to `SA || SU`. The schedule range are the same for both const only change the amount paid per hour for that range. The format of full condition is (CONDITION1 || CONDITION2 || CONDITION3) && (CONDITION4 || CONDITION5) in each case. Then assign the proper value of salary and push that value to an array.

**The conditions for first schedule range 00:01-09:00:** 

CONDITION1: startHour is zero and startMinute goes from one to fifty nine, in other words startHour goes from 00:01 to 00:59
CONDITION2: startHour is greater and equal than one and lower and equal than seven and startMinute goes from zero to fifty nine, in other words 01:00 to 07:59
CONDITION3: startHour is equal to eight and startMinute is equal to zero, in other words 08:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour for example: 08:01-09:00 where 9:00 is the limit for the first schedule range.
CONDITION4: closingHour is greater and equal than one and lower and equal than eight and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 01:00 to 08:59
CONDITION5 Finally the limit case where closingHour equals to zero and minute is equals to zero, in other words closingHour is equal to 09:00

**The conditions for second schedule range 09:01-18:00:** 

CONDITION1: startHour is nine and startMinute goes from one to fifty nine, in other words startHour goes from 09:01 to 09:59
CONDITOIN2: startHour is greater and equal than ten and lower and equal than sixteen and startMinute goes from zero to fifty nine, in other words 10:00 to 16:59
CONDITION3: startHour is equal to seventeen and startMinute is equal to zero, in other words 17:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
CONDITION4: closingHour is greater and equal than ten and lower and equal than seventeen and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 10:00 to 17:59
CONDITION5: Finally the limit case where closingHour equals to eighteen and minute is equals to zero, in other words closingHour is equal to 18:00

**The conditions for third schedule range 18:01-00:00:** 

CONDITION1: startHour is eighteen and startMinute goes from one to fifty nine, in other words startHour goes from 18:01 to 18:59
CONDITION2: startHour is greater and equal than nineteen and lower and equal than twenty two and startMinute goes from zero to fifty nine, in other words 19:00 to 22:59
CONDITION3: startHour is equal to twenty three and startMinute is equal to zero, in other words 23:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
CONDITION4: closingHour is greater and equal than nineteen and lower and equal than twenty three and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 19:00 to 23:59
CONDITION5: Finally the limit case where closingHour equals to zero AM and minute is equals to zero, in other words closingHour is equal to 00:00

The variable `salary` use the function `getSalary` that takes two parameters `hourDifference` and `salaryRange`. This function multiplies the hour difference with their respective salaryRange and then sum them to get the final value.

Finally I saved the message in an array, give proper format to remove commas and pass it through `textarea.value` and then to `readAsText()` property of FileReader API, this will show the message in the textarea.

## Constants and global variables<a name="constants"></a>

#### DAILY_SCHEDULES

A regular expresions to filter schedules with the form HH:MM-HH:MM. \d+ means at least one digit.

#### DAYS

A regular expresion to filter all capital letters in a strings. It is used to filter the days MO,TU,WE,TH,FR,SA,SU

#### CLOSING_HOUR

A regular expresion to filter the part after `-` in a format HH:MM-HH:MM

#### START_HOUR

A regular expression to filter the part before `-` in a format HH:MM-HH:MM

#### input

A variable to get the input of the DOM for the button.

#### textarea

A variable to manipulate the DOM of the textarea

#### employeeSalaryResult

A empty array to save the output of the program taking in consideration the user and the amount of salary.


## Classes and Functions <a name="functions"></a>

### Class FormatText()

This class contains deletePattern function().

### Constructor(text,pattern)

The constructor has two parameters `text` and `patterns` that will be used for `deletePattern` function.

**Parameters**

**text**
```
This is the string that will be processed.
```

**pattern**
```
This is the pattern that will be passed to RegExp() function. The `ig` flags indicate to ignore capitalization and look for all matches. 
```

### Functions

#### deletePattern()

Take a `string` and a `regular expresion` and delete that pattern of the string. Then the formatted string is returned.

**Return value**
 
 Returns the same `string` after erasing the regex pattern passed as input.

### Class FormatTime()

This class contains `getHour()` and `getMinute()` functions.

### constructor(schedules)

The constructor has one parameter `schedules` that will be used for `deletePattern` function.

**Parameters**

`schedules` This is the string to be manipulated. Has the form of HH:MM,HH:MM,HH:MM,HH:MM 

### Functions

#### getHour()

Return a numeric array with the hours of the schedules string.

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

#### getMinutes()

Return a numeric array with the minutes of the schedules string.

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

### Class FormatSalaryCalculator()

This class contains `hourSubstraction()` , `getSalaryRange()` and `getSalary()` functions.

### constructor(closingHour=[],startHour=[],closingMinute=[],startMinute=[],days=[])

The constructor has two parameters `closingHour`, `startHour`, `closingMinute`, `startMinute`, `days` that will be used on the functions below.

**Parameters**

**closingHour**
```
The numeric array of hours for closingHourAndMinute.
```

**startHour**
```
The numeric array of hours for startHourAndMinute.
```

**closingMinute**
```
The numeric array of minutes for closingHourAndMinute.
```

**startMinute**
```
The numeric array of minutes for startHourAndMinute.
```

**days**
```
The array of strings that have the days MO,TU,WE,TH,FR,SA or SU.
 ```

### Functions

#### hourSubstraction()

Returns a numeric array with the difference between closingHour and startHour. Also considers that the differnce in minutes is 60 minutes otherwise the difference will be closingHour minus startHour minus one. 

```js
hourSubstraction = () => {
        let substraction = [];
        if(this.closingHour.length = this.startHour.length){
            for(var i = 0 ; i< this.closingHour.length; i++){
              //Difference of minutes is equals to 60
              if((this.closingMinute[i] == this.startMinute[i])){
                  if(this.closingHour[i] == 0){ 
                      this.closingHour[i] = 24; //Change to 24 to do substraction properly
                      substraction.push(this.closingHour[i] - this.startHour[i]);
                      this.closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
                  }
                  else if (this.closingHour[i] !=0){
                      substraction.push(this.closingHour[i] - this.startHour[i])
                  }
              }
              //Difference of minutes is lower than 60
              else if((this.closingMinute[i] != this.startMinute[i])){

                  if(this.closingHour[i] == 0){
                      this.closingHour[i] = 24; //Change to 24 to do substraction properly
                      substraction.push(this.closingHour[i] - this.startHour[i] - 1);
                      this.closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
                  }
                  else if(this.closingHour[i] !=0){
                      substraction.push(this.closingHour[i] - this.startHour[i] - 1);
                  }
              } 
                
            }
            
            return substraction;
        }
    }
```

**Return value**

Returns a numeric array with the difference of hours between closingHour and startHour. 

**Condition 1**

This condition is for the midnight hour. The hour system used don't have 24 to represent midnight we have zero, so this will fix that issue and then substract closingHour and startHour. Also the condition `((this.closingMinute[i] == this.startMinute[i]))` will considered that the difference is actually 60 minutes. 

```js
if((this.closingMinute[i] == this.startMinute[i])){
         if(this.closingHour[i] == 0){ 
                 this.closingHour[i] = 24; //Change to 24 to do substraction properly
                 substraction.push(this.closingHour[i] - this.startHour[i]);
                 this.closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
         }
...                  
```

**Example:**

23:00-00:00  `this.startHour` = 23 , `this.closingHour` = 0, `this.startMinute` = 0, `this.closingMinute` = 0. The difference here is 60 minutes. So the difference of hours should be (24-23) equals one.


**Condition 2**

This condition consider every hour except zero hour. Also considerer that the difference is 60 minutes.

```js
if((this.closingMinute[i] == this.startMinute[i])){
                  ...
                  ...
                  
         else if (this.closingHour[i] !=0){
                 substraction.push(this.closingHour[i] - this.startHour[i])
         }
}
```

**Example:**

08:00-09:00 `this.startHour` = 8, `this.closingHour` = 9, `this.startMinute` = 0, `this.closingMinute` = 0. The difference here is 60 minutes. So the difference of hours should be (9-8) equals one.


**Condition 3**

This condition is for the midnight hour. The hour system used don't have 24 to represent midnight we have zero, so this will fix that issue and then substract closingHour and startHour. Also the condition `((this.closingMinute[i] != this.startMinute[i]))` will considered that the difference is not 60 minutes and reduce the difference of hours by one.

```js
else if((this.closingMinute[i] != this.startMinute[i])){

         if(this.closingHour[i] == 0){
               this.closingHour[i] = 24; //Change to 24 to do substraction properly
               substraction.push(this.closingHour[i] - this.startHour[i] - 1);
               this.closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
         }
...         
```

**Example:**

22:50-00:00  `this.startHour` = 22 , `this.closingHour` = 0, `this.startMinute` = 50, `this.closingMinute` = 50. The difference here is 60 + 50 equals 110 minutes giving an hour and fifty minutes. So the difference of hours should not be (24-22) equals two. The difference should be one, this is achieved substracting by one the actual difference of hours.

**Condition 4**

This condition is for the midnight hour. The hour system used don't have 24 to represent midnight we have zero, so this will fix that issue and then substract closingHour and startHour. Also the condition `((this.closingMinute[i] != this.startMinute[i]))` will considered that the difference is not 60 minutes and reduce the difference of hours by one.

```js
else if((this.closingMinute[i] != this.startMinute[i])){
         ...
         ...
                  
         else if(this.closingHour[i] !=0){
                substraction.push(this.closingHour[i] - this.startHour[i] - 1);
         }
} 
```

**Example:**

06:50-09:00 `this.startHour` = 6, `this.closingHour` = 9, `this.startMinute` = 50, `this.closingMinute` = 0. The difference here is 60 + 60 + 50 equals 170 minutes giving two hours and fifty minutes. So the difference of hours should not be( 9-6) equals three. The difference should be two, this is achieves substracting by one the actual difference of hours.


#### getSalaryRange()

Obtain the salary per hour based on the day and the interval of schedule.

```js
getSalaryRange = ()=> {
        let salaryRangeArray = [],
            salaryPerHour = 0;
    
        for (var i =0; i<this.days.length; i++){

            const WORKWEEK = (this.days[i] == "MO" || this.days[i] == "TU" || this.days[i] == "WE" || this.days[i] == "TH" || this.days[i] == "FR");
            const WEEKEND = (this.days[i] == "SA" || this.days[i] == "SU");

            const ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM = ((((this.startHour[i] == 0) && (this.startMinute[i] >= 1 && this.startMinute[i] <=59)) || ((this.startHour[i] >=1 && this.startHour[i] <=7) && (this.startMinute[i] >=0 && this.startMinute[i] <=59)) || ((this.startHour[i]==8 && this.startMinute[i]==0)) ) && ( ((this.closingHour[i] >=1 && this.closingHour[i] <=8) && (this.closingMinute[i] >=0 && this.closingMinute[i] <=59)) || ((this.closingHour[i] == 9) && (this.closingMinute[i] == 0))));
            const NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM = ((((this.startHour[i] == 9) && (this.startMinute[i] >= 1 && this.startMinute[i] <=59)) || ((this.startHour[i] >=10 && this.startHour[i] <=16) && (this.startMinute[i] >=0 && this.startMinute[i] <=59)) || ((this.startHour[i]==17 && this.startMinute[i]==0)) ) && (((this.closingHour[i] >=10 && this.closingHour[i] <=17) && (this.closingMinute[i] >=0 && this.closingMinute[i] <=59)) || ((this.closingHour[i] == 18) && (this.closingMinute[i] == 0))));
            const EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM = ((((this.startHour[i] == 18) && (this.startMinute[i] >= 1 && this.startMinute[i] <=59)) || ((this.startHour[i] >=19 && this.startHour[i] <=22) && (this.startMinute[i] >=0 && this.startMinute[i] <=59)) || ((this.startHour[i]==23 && this.startMinute[i]==0))) && (((this.closingHour[i] >=19 && this.closingHour[i] <=23) && (this.closingMinute[i] >=0 && this.closingMinute[i] <=59)) || ((this.closingHour[i] == 0 && this.closingMinute[i] == 0))));
        
            if(WORKWEEK){           
                if(ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=25); }
                else if (NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM){ salaryRangeArray.push(salaryPerHour=15); }
                else if(EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=20); }
            }
            else if(WEEKEND){
                if(ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=30); }
                else if(NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM){ salaryRangeArray.push(salaryPerHour=20); }
                else if(EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=25); }
            }
            else{console.log("Invalid") }
        }
        
        return salaryRangeArray;
    }
```



**Return value**

Returns `salaryRangeArray`a numeric array with the amount to pay based on the schedules and the day. 

The format of full condition is (CONDITION1 || CONDITION2 || CONDITION3) && (CONDITION4 || CONDITION5) in each case.

**The conditions for first schedule range 00:01-09:00:** this is represented in **ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM**

CONDITION1: startHour is zero and startMinute goes from one to fifty nine, in other words startHour goes from 00:01 to 00:59
CONDITION2: startHour is greater and equal than one and lower and equal than seven and startMinute goes from zero to fifty nine, in other words 01:00 to 07:59
CONDITION3: startHour is equal to eight and startMinute is equal to zero, in other words 08:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour for example: 08:01-09:00 where 9:00 is the limit for the first schedule range.
CONDITION4: closingHour is greater and equal than one and lower and equal than eight and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 01:00 to 08:59
CONDITION5: Finally the limit case where closingHour equals to zero and minute is equals to zero, in other words closingHour is equal to 09:00

**The conditions for second schedule range 09:01-18:00:** this is represented in **NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM**

CONDITION1: startHour is nine and startMinute goes from one to fifty nine, in other words startHour goes from 09:01 to 09:59
CONDITION2: startHour is greater and equal than ten and lower and equal than sixteen and startMinute goes from zero to fifty nine, in other words 10:00 to 16:59
CONDITION3: startHour is equal to seventeen and startMinute is equal to zero, in other words 17:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
CONDITION4 closingHour is greater and equal than ten and lower and equal than seventeen and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 10:00 to 17:59
CONDITION5 Finally the limit case where closingHour equals to eighteen and minute is equals to zero, in other words closingHour is equal to 18:00

**The conditions for third schedule range 18:01-00:00:** this is represented in **EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM**

CONDITION1: startHour is eighteen and startMinute goes from one to fifty nine, in other words startHour goes from 18:01 to 18:59
CONDITION2: startHour is greater and equal than nineteen and lower and equal than twenty two and startMinute goes from zero to fifty nine, in other words 19:00 to 22:59
CONDITION3: startHour is equal to twenty three and startMinute is equal to zero, in other words 23:00. This case is separate from the second case because startMinute can only be zero otherwise the time between closingHour and startHour is less than an hour. for example: 17:01-18:00 where 18:00 is the limit for the second schedule range.
CONDITION4: closingHour is greater and equal than nineteen and lower and equal than twenty three and closingMinute is greater and equal to zero and lower and equals to fifty nine, in other words closingHour goes from 19:00 to 23:59
CONDITION5: Finally the limit case where closingHour equals to zero AM and minute is equals to zero, in other words closingHour is equal to 00:00

The first thing to do is evaluate if this.day[i] is equal to **WORKWEEK=MO||TU||WE||TH||FR** and then assign the proper salaryPerHour. In case the this.days[i] is equal to any of the **WEEKEND=SA||SU** values applies different salaryPerHour.


```js
   if(WORKWEEK){
            
            if(ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=25); }
            else if (NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM){ salaryRangeArray.push(salaryPerHour=15); }
            else if(EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=20); }
        }
        else if(WEEKEND){
            if(ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=30); }
            else if(NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM){ salaryRangeArray.push(salaryPerHour=20); }
            else if(EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM){ salaryRangeArray.push(salaryPerHour=25); }
        }
```

#### getSalary(hourDifference = [], salaryRange = [])

Returns the sum of all salaries per hour multiply for their respective hour difference.

```js
getSalary = (hourDifference = [], salaryRange=[]) => {
        let sum = 0;
    
        for(var i=0; i< hourDifference.length; i++){
            sum += (hourDifference[i] * salaryRange[i]);
        }
        return sum;
    }
```

**Parameters**

**hourDifference**
```
The numeric array that shows the difference of hours between closingHour and startHour.
```

**salaryRange**
```
The numeric array that shows how much will be paid for an interval of time and day.
```

**Return value**

Returns `sum`a number with the total wage to be paid to the employee.

## Variables <a name="variables"></a>

#### employees (String)

This string is obtained after using `split('=')` and save the first parameter of the array `getEmployeesAndSchedules`. 

```
First  Iteration:  employees = RENE
Second Iteration:  employees = ASTRID
Third  Iteration:  employees = CHRIS
Fourth Iteration:  employees = KATHY
Fifth  Iteration:  employees = JOHN
```

#### schedules (String)

This string is obtained after using `split('=')` and save the second parameter of the array `getEmployeesAndSchedules`.

```
First  Iteration:  schedules = MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
Second Iteration:  schedules = MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
Third  Iteration:  schedules = MO08:00-09:00,MO17:00-18:00,TU10:00-17:00,TH10:00-17:00,SU20:00-21:00
Fourth Iteration:  schedules = MO05:23-08:23,TU19:00-21:00,FR11:00-13:00,SU20:00-21:00
Fifth  Iteration:  schedules = MO05:00-08:00,WE19:00-21:00,FR11:00-13:00,SU22:00-00:00

```

#### days (String Array)

A String is obtained making use of the function `getPattern()` that take two parameters an *string* and a *regex pattern*. `getPattern()` erase the pattern and replaced it with `""`. The pattern used is `DELETE_SCHEDULES = /\d{2}:\d{2}-\d{2}:\d{2}/;` ,the result is a *string* of days separated by commas `MO,TU,TH,SA,SU` , the string is split by *commas* and then days variable becomes an **array**.

```
First  Iteration:  days = ["MO", "TU", "TH", "SA", "SU"]
Second Iteration:  days = ["MO", "TH", "SU"]
Third  Iteration:  days = ["MO", "MO", "TU", "TH", "SA", "SU"]
Fourth Iteration:  days = ["MO", "TU", "FR", "SU"]
Fifth  Iteration:  days = ["MO", "WE", "FR","SU"]
```

#### dailySchedule (String)

This variable is obtained using `getPattern()` with a *string* and the *regex pattern* `DELETE_DAYS = /[A-Z]/;` as parameters then return a **string** as result. This function will erase all days (MO,TU,WE,TH,FR,SA,SU) of the string and just keep the daily schedules.

```
First  Iteration:  dailySchedule = 10:00-12:00,10:00-12:00,01:00-03:00,14:00-18:00,20:00-21:00
Second Iteration:  dailySchedule = 10:00-12:00,12:00-14:00,20:00-21:00
Third  Iteration:  dailySchedule = 08:00-09:00,17:00-18:00,10:00-17:00,10:00-17:00,20:00-21:00
Fourth Iteration:  dailySchedule = 05:23-08:23,19:00-21:00,11:00-13:00,20:00-21:00
Fifth  Iteration:  dailySchedule = 05:00-08:00,19:00-21:00,11:00-13:00,22:00-00:00
```

#### startHourAndMinute (String)

This variable takes the first part of the *dailyschedule*, in other words take the part before `-`. This variable is obtained using `getPattern()` with the *string dailySchedule* and the *regex pattern* `DELETE_CLOSING_HOUR = /-\d{2}:\d{2}/` as parameters and then return a **string** as result.

```
First  Iteration:  startHourAndMinute = 10:00,10:00,01:00,14:00,20:00
Second Iteration:  startHourAndMinute = 10:00,12:00,20:00
Third  Iteration:  startHourAndMinute = 08:00,17:00,10:00,10:00,20:00
Fourth Iteration:  startHourAndMinute = 05:23,19:00,11:00,20:00
Fifth  Iteration:  startHourAndMinute = 05:00,19:00,11:00,22:00
```

#### closingHourAndMinute (String)

This variable takes the second part of the *dailyschedule*, in other words take the part after `-`. This variable is obtained using `getPattern()` with the *string dailySchedule* and the *regex pattern* `DELETE_START_HOUR = /\d{2}:\d{2}-/` as parameters and then return a **string** as result.

```
First  Iteration:  closinHourAndMinute = 12:00,12:00,03:00,18:00,21:00
Second Iteration:  closinHourAndMinute = 12:00,14:00,21:00
Third  Iteration:  closinHourAndMinute = 09:00,18:00,17:00,17:00,21:00
Fourth Iteration:  closinHourAndMinute = 08:23,21:00,13:00,21:00
Fifth  Iteration:  closinHourAndMinute = 08:00,21:00,13:00,00:00
```

#### startHour (Numeric Array)

This variable takes the hour of `startHourAndMinute`, in other words the part before `:` . This variable is obtained using `getHour()` with the *string* startHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 23 and represent the hours.

```
First  Iteration:  startHour = [10, 10, 1, 14, 20]
Second Iteration:  startHour = [10, 12, 20]
Third  Iteration:  startHour = [8, 17, 10, 10, 20]
Fourth Iteration:  startHour = [5, 19, 11, 20]
Fifth  Iteration:  startHour = [5, 19, 11, 22]
```

#### startMinute (Numeric Array)

This variable takes the minutes of `startHourAndMinute`, in other words the part after `:` . This variable is obtained using `getMinute()` with the *string* startHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 59 and represent the minutes.

```
First  Iteration:  startMinute = [0, 0, 0, 0, 0]
Second Iteration:  startMinute = [0, 0, 0]
Third  Iteration:  startMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  startMinute = [23, 0, 0, 0]
Fifth  Iteration:  startMinute = [0, 0, 0, 0]
```

#### closingHour (Numeric Array)

This variable takes the hour of `closingHourAndMinute`, in other words the part before `:` . This variable is obtained using `getHour()` with the *string* closingHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 23 and represent the hours. This is the same process as `startHour` considering the other interval of the schedule.

```
First  Iteration:  closingHour = [12, 12, 3, 18, 21] 
Second Iteration:  closingHour = [12, 14, 21]
Third  Iteration:  closingHour = [9, 18, 17, 17, 21]
Fourth Iteration:  closingHour = [8, 21, 13, 21]
Fifth  Iteration:  closingHour = [8, 21, 13, 0]
```

#### closingMinute (Numeric Array)

This variable takes the minutes of `closingHourAndMinute`, in other words the part after `:` . This variable is obtained using `getMinute()` with the *string* closingHourAndMinute as parameter and then return an **array of numbers**. These numbers are between 0 and 59 and represent the minutes. This is the same process as `startMinute` considering the other interval of the schedule.

```
First  Iteration:  closingMinute = [0, 0, 0, 0, 0]
Second Iteration:  closingMinute = [0, 0, 0]
Third  Iteration:  closingMinute = [0, 0, 0, 0, 0, 0]
Fourth Iteration:  closingMinute = [23, 0, 0, 0]
Fifth  Iteration:  closingMinute = [0, 0, 0, 0]
```

#### hourDifference (Numeric Array)

This variable is obtained with the function `hourSubstraction()` that takes the arrays `closingHour` and `startHour` as parameters, applies the substraction and then return an **array of numbers** as the answer.

```
First  Iteration:  hourDifference = [2, 2, 2, 4, 1]
Second Iteration:  hourDifference = [2, 2, 1]
Third  Iteration:  hourDifference = [1, 1, 7, 7, 1]
Fourth Iteration:  hourDifference = [3, 2, 2, 1]
Fifth  Iteration:  hourDifference = [3, 2, 2, 2]
```

#### salaryRange (Numeric Array)

This variable is obtained with the function `getSalaryRange()` that takes `startHour`,`startMinute`,`closingHour`,`closingMinute` and `days` as parameters and return an **array** with the specific salary for that schedule range and day.

```
First  Iteration:  salaryRange = [15, 15, 25, 20, 25]
Second Iteration:  salaryRange = [15, 15, 25]
Third  Iteration:  salaryRange = [25, 15, 15, 15, 25]
Fourth Iteration:  salaryRange = [25, 20, 15, 25]
Fifth  Iteration:  salaryRange = [25, 20, 15, 25]
```

#### salary (Number)

This variable is obtained multiplying `salaryRange` and `hourDifference` using the function `getSalary()`. This value is **number** and changes in each iteration.

```
First  Iteration:  salary = 215
Second Iteration:  salary =  85
Third  Iteration:  salary = 275
Fourth Iteration:  salary = 170
Fifth  Iteration:  salary = 195
```

#### Message Management

The variable `employeeSalaryResult` saves the message `The amount to pay to employee ${employees} is ${salary} USD\n` for each iteration using `push`, then convert to string with `toString()`, replace each *comma* with *space* and save it in **textarea.value**. Finally using the property `readAsText` of FileReader() the content of `textarea.value` is shown in the textarea. 

```
The amount to pay to employee RENE is 215 USD
The amount to pay to employee ASTRID is 85 USD
The amount to pay to employee CHRIS is 275 USD
The amount to pay to employee KATHY is 170 USD
The amount to pay to employee JOHN is 195 USD
```

## Testing with Jest <a name="testing"></a>

Jest is library to test functions and classes in Javascript and other technologies related to Javascript like React. Jest is installed using npm that is the package manager of Node.js

### Software Installed

- Node.js
- Node.js Extension Pack for Visual Studio Code.
- Jest library.

### Steps to Reproduce.

1. Open the repository in Visual Studio Code.
2. Get Node.js dependencies in the current project. Then type in console `npm install`. Jest is already added in the dependencies in package.json.
3. Run `npm test` to execute tests.


### Testing Classes

Each js file corresponds to each class: **formatText.js, formatTime.js, formatSalaryCalculator.js**. Testing files have the same name just adding `.test.js` to the name.

#### formatText.test.js

Evaluate the behavior of each of the regular expresions defined in the main code and confirm that the value is shown is the same.

```js
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
```

#### formatTime.test.js

Evaluate that the class formatTime returns a numeric array after passing a string with the format HH:MM.

```js
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
```

#### formatSalaryCalculator.test.js

Evaluate the three functions of Class FormatSalaryCalculator: **hourSubstraction(), getSalaryRange(), getSalary(hourDifference, salaryRange)**

```js
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
```
