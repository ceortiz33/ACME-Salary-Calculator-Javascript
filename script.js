//------------------------- CONSTANTS AND VARIABLES ---------------------------//

const DAILY_SCHEDULES = /\d{2}:\d{2}-\d{2}:\d{2}/;
const DAYS = /[A-Z]/;
const CLOSING_HOUR = /-\d{2}:\d{2}/
const START_HOUR = /\d{2}:\d{2}-/
let input= document.querySelector('input');
let textarea = document.querySelector('textarea');
let employeeSalaryResult = [];


//--------------------------------- FUNCTIONS ---------------------------------//

// delete a pattern: get a pattern and replace it with ""
const deletePattern = (textFile = "", pattern) => {
    return textFile.replace(new RegExp(pattern,"ig"),"");
}

// get Hour from format HH:MM
const getHour = (schedules = "") => {
    schedules = schedules.split(/[:,]/);
    
    for (var i = 0; i < schedules.length; i++){
        schedules.splice(i + 1, 1);
    }
    //eliminar la parte impar
    
    return schedules.map(Number);
}

// get Minutes from format HH:MM
const getMinutes = (textFile = "") => {
    textFile = textFile.split(/[:,]/);
    for(var i = 0; i < textFile.length; i++){
        textFile.splice(i,1);
    }
    //elimina la parte par
    return textFile.map(Number);
}

// get the number of hours that an employee works
const hourSubstraction = (closingHour = [], startHour= [], closingMinute = [], startMinute = []) => {
    substraction = [];
    if(closingHour.length = startHour.length){
        for(var i = 0 ; i< closingHour.length; i++){
            
                if(closingHour[i] == 0 && (closingMinute[i] == startMinute[i])){ 
                    closingHour[i] = 24; //Change to 24 to do substraction properly
                    substraction.push(closingHour[i] - startHour[i]);
                    closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
                }
                else if (closingHour[i] !=0 && (closingMinute[i] == startMinute[i])){
                    substraction.push(closingHour[i] - startHour[i])
                }
                else if(closingHour[i] == 0 && (closingMinute[i] != startMinute[i])){
                    closingHour[i] = 24; //Change to 24 to do substraction properly
                    substraction.push(closingHour[i] - startHour[i] - 1);
                    closingHour[i] = 0; //change back to zero to achieve the conditions of salary range
                }
                else if(closingHour[i] !=0 && (closingMinute[i] != startMinute[i])){
                    substraction.push(closingHour[i] - startHour[i] - 1);
                }
        }
        
        return substraction;
    }
}        

// Determines which salary range employee will be paid based on day and range of hour
const getSalaryRange = (startHour=[],startMinute=[],closingHour=[],closingMinute=[],days=[])=>{
    salaryRangeArray = [];
    salaryPerHour = 0;
    
    for (var i =0; i<days.length; i++){

        const WORKWEEK = (days[i] == "MO" || days[i] == "TU" || days[i] == "WE" || days[i] == "TH" || days[i] == "FR");
        const WEEKEND = (days[i] == "SA" || days[i] == "SU");

        const ZERO_HOUR_ONE_MINUTE_TO_NINE_HOUR_ZERO_MINUTE_AM = ((((startHour[i] == 0) && (startMinute[i] >= 1 && startMinute[i] <=59)) || ((startHour[i] >=1 && startHour[i] <=7) && (startMinute[i] >=0 && startMinute[i] <=59)) || ((startHour[i]==8 && startMinute[i]==0)) ) && ( ((closingHour[i] >=1 && closingHour[i] <=8) && (closingMinute[i] >=0 && closingMinute[i] <=59)) || ((closingHour[i] == 9) && (closingMinute[i] == 0))));
        const NINE_HOUR_ONE_MINUTE_TO_EIGHTEEN_HOUR_ZERO_MINUTE_PM = ((((startHour[i] == 9) && (startMinute[i] >= 1 && startMinute[i] <=59)) || ((startHour[i] >=10 && startHour[i] <=16) && (startMinute[i] >=0 && startMinute[i] <=59)) || ((startHour[i]==17 && startMinute[i]==0)) ) && (((closingHour[i] >=10 && closingHour[i] <=17) && (closingMinute[i] >=0 && closingMinute[i] <=59)) || ((closingHour[i] == 18) && (closingMinute[i] == 0))));
        const EIGHTEEN_HOUR_ONE_MINUTE_TO_ZERO_HOUR_ZERO_MINUTE_AM = ((((startHour[i] == 18) && (startMinute[i] >= 1 && startMinute[i] <=59)) || ((startHour[i] >=19 && startHour[i] <=22) && (startMinute[i] >=0 && startMinute[i] <=59)) || ((startHour[i]==23 && startMinute[i]==0))) && (((closingHour[i] >=19 && closingHour[i] <=23) && (closingMinute[i] >=0 && closingMinute[i] <=59)) || ((closingHour[i] == 0 && closingMinute[i] == 0))));
        
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
        else{ textarea.value="Invalid day"; }
    }

    return salaryRangeArray;
}

// Return the salary employee will be paid bases on the difference of hours and salary range
const getSalary = (hourDifference = [], salaryRange = []) => {
    let sum = 0;
    for(var i=0; i< hourDifference.length; i++){
        sum += (hourDifference[i] * salaryRange[i]);
    }
    return sum;
}


//--------------------------------- MAIN CODE -----------------------------------//

input.addEventListener('change', function (e) {
    
    let reader = new FileReader(); //call API Filereader

    //content of the file
    reader.onload = function () {
      
      // Get text from input.txt file and split in lines to obtain employee data 
      let employeeData = reader.result.trim().split(/\n/);

      for (let i=0; i< employeeData.length; i++){

          //Convert to string each line of employee and schedule        
          employeeDataToString = employeeData[i].toString(); 

          // Split Employees and Schedules
          getEmployeesAndSchedules = employeeDataToString.split("=");
          employees = getEmployeesAndSchedules[0]; 
          schedules = getEmployeesAndSchedules[1];
          
          // Split days array and daily Schedule string
          days = deletePattern(schedules,DAILY_SCHEDULES).trim().split(",");
          dailySchedules = deletePattern(schedules,DAYS);
          
          //Split startHourAndMinute and closingHourAndMinute with format HH:MM
          startHourAndMinute = deletePattern(dailySchedules,CLOSING_HOUR);
          closingHourAndMinute = deletePattern(dailySchedules,START_HOUR);
          
          // Split Hour(HH) and Minute(MM) for Initial and closing Hours
          startHour = getHour(startHourAndMinute);
          startMinute = getMinutes(startHourAndMinute);
          closingHour = getHour(closingHourAndMinute);
          closingMinute = getMinutes(closingHourAndMinute);
                   
          // Determine the salary based on salaryRange and hourDifference
          hourDifference = hourSubstraction(closingHour, startHour, closingMinute, startMinute);
          salaryRange =  getSalaryRange(startHour,startMinute,closingHour,closingMinute,days);
          salary = getSalary(hourDifference,salaryRange);

          // Save output to employeelogdata to display in textarea
          employeeSalaryResult.push(`The amount to pay to employee ${employees} is ${salary} USD\n`);
   
      }
      
      textarea.value = employeeSalaryResult.toString().replace(/,/g,"");
    };
     
    
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(input.files[0]);
    
}, false);