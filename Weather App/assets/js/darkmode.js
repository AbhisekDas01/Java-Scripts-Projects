//get the system color profile

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(darkMode){
    document.body.classList.remove('lightMode');
    console.log(darkMode);
}
else{
    document.body.classList.add('lightMode');
}


const lightmodeBtn = document.querySelector('.light-mode');
const darkModeBtn = document.querySelector(".darkmode-btn");


const modeSwitch = document.querySelector(".darkmode-container");

modeSwitch.addEventListener("click" , function(){
    document.body.classList.toggle('lightMode');
})