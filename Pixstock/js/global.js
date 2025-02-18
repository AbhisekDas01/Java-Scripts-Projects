"use strict";

/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";


/**
 * Header on-scroll state
 */

const $header = document.querySelector("[data-header]");

window.addEventListener('scroll' , ()=>{
    $header.classList[window.scrollY > 50? "add" : "remove"]("active");
});

/**
 * Add ripple effect
 */

const rippleElements = document.querySelectorAll("[data-ripple]");

rippleElements.forEach(Element =>ripple(Element));


/**
 * nav bar toogle for mobile devices
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const navBar = document.querySelector("[data-navigation]");

const scrim = document.querySelector("[data-scrim]");

addEventOnElements(navTogglers , 'click' , () => {
    navBar.classList.toggle("show");
    scrim.classList.toggle("active");
})


/**
 * filterObj declaration
 */

window.filterObj = {};


