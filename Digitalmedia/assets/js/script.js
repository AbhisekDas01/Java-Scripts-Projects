'use strict';

//add event lisenter to multiple elements 
const addEventOnElements = (elements , eventType , callback) =>{

    elements.forEach(element => {
        element.addEventListener(eventType , callback);
    });
}

/**
 * navbar toggle for mobile
 */

const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");


//function 
const toggleNavbar = () =>{
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle('active');
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

const NavItems = [navbar , navToggleBtn , overlay]; // array of items

addEventOnElements(NavItems , 'click' , toggleNavbar);


/**
 * paralax effect
 */

const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener('mousemove' , (event) => {
    let len = parallaxElements.length;

    for(let i = 0 ; i < len ; i++){
        
        //clientX & clientY gives the position of the cursor in x and y 
        //parallaxElements[i].dataset.parallaxSpeed will get the value of the html data atrubute (data-parallax-speed = "20");
        const movementX = (event.clientX/window.innerWidth)*Number(parallaxElements[i].dataset.parallaxSpeed);
        const movementY = (event.clientY/window.innerHeight)*Number(parallaxElements[i].dataset.parallaxSpeed);


        parallaxElements[i].animate(
            {
                // Apply a smooth parallax effect using translate3d for better GPU performance
                transform: `translate3d(${movementX}px, ${movementY}px, 0)`
            },
            {
                duration: 500, // Animation duration in milliseconds (0.5 seconds)
                fill: 'forwards', // Keeps the final position after the animation ends
                // easing: 'ease-out' // Slows down towards the end for a natural movement effect
            }
        );
    }

});

