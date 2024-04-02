const getCurrentDate = () => {
    let currentDate = {};
    const startDate = new Date();
    const endDate = new Date();
    
    // for Database
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    currentDate.start = startDate;

    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setMilliseconds(59);
    currentDate.end = endDate;

    return { currentDate };
};

const checkDate = (date, e) => {
    let currentDate = {...date},
    greaterThan = true;
    
    const startDate = new Date(e.target.value),
        endDate = new Date(e.target.value);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    currentDate["start"] = startDate;

    if(startDate > date.end){ 
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        currentDate["end"] = endDate;
        greaterThan = true;
    }else{
        greaterThan = false;
    }

    return { currentDate, greaterThan, startDate, endDate };
}

export { getCurrentDate, checkDate };