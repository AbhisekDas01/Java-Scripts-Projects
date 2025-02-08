
'use strict';

//api key
const api_key = '7c2a5a7eecbfe599be281587425f9cf9';


/**
 * 
 * @param {string} URL api endpoint url
 * @param {Function} callback callback function
 */

export const fetchData = function(URL , callback){

    // const response = await fetch(`${URL}&appid=${api_key}`)
    // const data = await response.json();
    // callback(data);

    fetch(`${URL}&appid=${api_key}`)
    .then(res => res.json())
    .then(data => callback(data));

}


export const url = {
    currentWeather(latitude , longitude) {
        return  `https://api.openweathermap.org/data/2.5/weather?${latitude}&${longitude}&units=metric`;
    },

    forecast(latitude , longitude){
        return `https://api.openweathermap.org/data/2.5/forecast?${latitude}&${longitude}&units=metric`;
    },

    airPolution(latitude , longitude){
        return `http://api.openweathermap.org/data/2.5/air_pollution?${latitude}&${longitude}`;
    },

    getGeoLocation(latitude , longitude){

        return `http://api.openweathermap.org/geo/1.0/reverse?${latitude}&${longitude}`;
    },

    /**
     * 
     * @param {string} query search eg india , bhubneswar 
     * @returns 
     */
    Geo(query){

        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    }
}
