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
            else{salaryRangeArray.push(salaryPerHour=NaN) }
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


module.exports = FormatSalaryCalculator