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

module.exports = FormatTime