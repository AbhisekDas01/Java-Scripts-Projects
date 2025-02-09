// Script for navigation bar
const bar = document.getElementById("bar");
const nav = document.querySelector(".nav-items");
const closeBtn = document.getElementById("close");


bar.addEventListener('click' , function(){
    nav.classList.add('active');
});

closeBtn.addEventListener('click' , () =>{
    nav.classList.remove("active");
})
