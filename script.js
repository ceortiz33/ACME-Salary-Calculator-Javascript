//------------------------- CONSTANTS AND VARIABLES ---------------------------//
//import {FormatTime, FormatText,SalaryCalculator} from './classes.js';

const DAILY_SCHEDULES = /\d+:\d+-\d+:\d+/;
const DAYS = /[A-Z]/;
const CLOSING_HOUR = /-\d+:\d+/
const START_HOUR = /\d+:\d+-/
let input= document.querySelector('input');
let textarea = document.querySelector('textarea');
let employeeSalaryResult = [];


//--------------------------------- FUNCTIONS AND CLASSES ---------------------------------//

class FormatText{
    constructor(text,pattern){
        this.text = text;
        this.pattern = pattern;
    }

    // delete a pattern: get a pattern and replace it with ""
    deletePattern = () => {
        return this.text.replace(new RegExp(this.pattern,"ig"),"");
    }
}


class FormatTime{

    constructor(schedules){
        this.schedules = schedules;
    }
    
    // get Hour from format HH:MM
    getHour = () => {
        this.schedules = this.schedules.split(/[:,]/);
        
        for (var i = 0; i < this.schedules.length; i++){
            this.schedules.splice(i + 1, 1);//delete odd part
        }
        
        return this.schedules.map(Number);
    }
    
    // get Minutes from format HH:MM
    getMinutes = () => {
        this.schedules = this.schedules.split(/[:,]/);
        for(var i = 0; i < this.schedules.length; i++){
            this.schedules.splice(i,1);//delete even part
        }
        return this.schedules.map(Number);
    }   
}

class FormatSalaryCalculator{

    constructor(closingHour=[],startHour=[],closingMinute=[],startMinute=[],days=[]){
        this.closingHour    = closingHour;
        this.startHour      = startHour;
        this.closingMinute  = closingMinute;
        this.startMinute    = startMinute;
        this.days           = days;
    }

    // get the number of hours that an employee works
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

    // Determines which salary range employee will be paid based on day and range of hour
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

    // Return the salary employee will be paid bases on the difference of hours and salary range
    getSalary = (hourDifference = [], salaryRange=[]) => {
        let sum = 0;
    
        for(var i=0; i< hourDifference.length; i++){
            sum += (hourDifference[i] * salaryRange[i]);
        }
        return sum;
    }

}


//--------------------------------- MAIN CODE -----------------------------------//

input.addEventListener('change',  (e) => {
    
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
          days = new FormatText(schedules,DAILY_SCHEDULES).deletePattern().trim().split(",");
          dailySchedules = new FormatText(schedules,DAYS).deletePattern();
          
          //Split startHourAndMinute and closingHourAndMinute with format HH:MM
          startHourAndMinute   = new FormatText(dailySchedules,CLOSING_HOUR).deletePattern();
          closingHourAndMinute = new FormatText(dailySchedules,START_HOUR).deletePattern();
          
          // Split Hour(HH) and Minute(MM) for Initial and closing Hours
          startHour     = new FormatTime(startHourAndMinute).getHour();
          startMinute   = new FormatTime(startHourAndMinute).getMinutes();
          closingHour   = new FormatTime(closingHourAndMinute).getHour();
          closingMinute = new FormatTime(closingHourAndMinute).getMinutes();
                   
          // Determine the salary based on salaryRange and hourDifference
          salaryCalculator = new FormatSalaryCalculator(closingHour, startHour, closingMinute, startMinute, days);
          hourDifference   = salaryCalculator.hourSubstraction();
          salaryRange      = salaryCalculator.getSalaryRange();
          salary           = salaryCalculator.getSalary(hourDifference,salaryRange);

          // Save output to employeelogdata to display in textarea
          employeeSalaryResult.push(`The amount to pay to employee ${employees} is ${salary} USD\n`);
   
      }
      
      textarea.value = employeeSalaryResult.toString().replace(/,/g,"");
    };
     
    
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(input.files[0]);
    
}, false);