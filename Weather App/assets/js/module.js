'use strict'; //to enable strict mode


//array of day names 

export const weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

//array fo months

export const monthNames = [
    "Jan",   // January
    "Feb",   // February
    "Mar",   // March
    "Apr",   // April
    "May",   // May
    "Jun",   // June
    "Jul",   // July
    "Aug",   // August
    "Sep",   // September
    "Oct",   // October
    "Nov",   // November
    "Dec"    // December
];


//to get date and day

/**
 * 
 * @param {number} dateUnix time in UTC time zone(seconds)
 * @param {number} timeZone time zone adjustment(seconds)
 * @returns {string} format "sunday 10, jan"
 */
export const getDate = function(dateUnix , timeZone){

    console.log(dateUnix , timeZone);
    const date = new Date((dateUnix+timeZone)*1000); //to convert seconds to miliseconds *1000

    const dayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];

    return `${dayName} ${date.getUTCDate()}, ${monthName}`;

}

/**
 * 
 * @param {number} timeUnix time unix in utc format in seconds
 * @param {number} timeZone time zone in utc format in seconds
 * @returns {string} eg "2:34 PM"
 */

//this function will be used by sunrise and sunset 
export const getTime = function(timeUnix , timeZone){

    const date = new Date((timeUnix+timeZone)*1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    //note: we did hours % 12 || 12 to convert 24 hrs in to 12 hrs format
    //but when we are getting 12 or 24 its becomming 0 so we will take 12 
    return `${hours % 12 || 12}:${minutes} ${period}`;
}

/**
 * 
 * @param {number} timeUnix time unix in utc format in seconds
 * @param {number} timeZone time zone in utc format in seconds
 * @returns {string} eg "2 PM"
 */

//this function is used by today at (dom)
export const getHours = function(timeUnix , timeZone){

    const date = new Date((timeUnix+timeZone)*1000);
    const hours = date.getUTCHours();
    const period = hours >= 12 ? "PM" : "AM";

    //note: we did hours % 12 || 12 to convert 24 hrs in to 12 hrs format
    //but when we are getting 12 or 24 its becomming 0 so we will take 12 
    return `${hours % 12 || 12} ${period}`;
}

//to convert meters per second to kilometer / hours

/**
 * 
 * @param {number} mps meters/second
 * @returns {number} kilometers/hours
 */
export const mps_to_kmh = (mps) =>{

    const mph = mps*3600;

    return Math.floor(mph/1000);
}


//air quality 
export const aqiText = {
    1:{
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses tittle or no risk"
    },

    2:{
        level: "Fair",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    },

    3:{
        level: "Moderate",
        message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected"
    },

    4:{
        level: "Poor",
        message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects"
    },

    5:{
        level: "Very Poor",
        message: "Health warnings of emergency condition. The entire population is more likely to be affected."
    }
}