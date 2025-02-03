'use strict';

//importing this 2 functions form app.js
import {updateWeather , error404} from "./app.js";

const defaultLocation = "#/weather?lat=28.6138954&lon=77.2090057";
//defautLocation london

//fetch current location of the system
const currentLocation = function(){
    //getCurrentPosition takes to argument postion , error
    window.navigator.geolocation.getCurrentPosition(
        (position) =>{
            console.log(position.coords);
            const {latitude , longitude} = position.coords;

            updateWeather(`lat=${latitude}` , `lon=${longitude}`);

        }, (error) =>{
            console.log(error);
            window.location.hash = defaultLocation;
        }
    )

}



//searching new locations 
//...query is used to expand the query array 
const searchedLocation = (query) => updateWeather(...query.split("&"));
//updateweather("lat=23.7644025" , "lon=90.389015" )


//to store the key value pairs of url and functions
const routes = new Map([
    ["/current-location" , currentLocation],
    ["/weather" , searchedLocation]
]);


const checkHash = function() {

    const requestURL = window.location.hash.slice(1); //slice(1) removes '#' to get only url after "#" eg : #weather => weather

    /**
     * If the hash contains a query string (?param=value), it splits into:
        route → The part before ?
        query → The part after ?
     */
    const [route , query] = requestURL.includes ? requestURL.split("?") : [requestURL];
    //get(route)(query) retrives the function and (query) passes teh parameter to the fucntion
    routes.get(route) ? routes.get(route)(query) : error404();
}

/**
 * The "hashchange" event fires when the fragment identifier (the #hash part of a URL) changes in the browser's address bar.
 * 
 * https://example.com/#weather
    Here, #weather is the hash.

If the user changes the hash (e.g., https://example.com/#forecast), the "hashchange" event is triggered.
 */
window.addEventListener("hashchange" , checkHash);


//to add default location when page loads 
window.addEventListener("load" , function(){
    if(!window.location.hash){
        window.location.hash = '#/current-location';
    }
    else{
        checkHash();
    }
});