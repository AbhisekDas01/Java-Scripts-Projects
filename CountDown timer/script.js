// const endDate = new Date("1 January, 2025 1:58:00").getTime();

//title bar
const title = document.getElementById("update-title");

let x;
let givenTime;

// store the originalContent of the container
const originalContent = document.querySelector(".countdown").innerHTML;


//take user input

const startStopBtn = document.getElementById("start-stop")

//add eventlisener
startStopBtn.addEventListener('click', () => {

    // fetch all the details
    let day = document.getElementById("days-input").value;
    let hours = document.getElementById("hours-input").value;
    let minutes = document.getElementById("minutes-input").value;
    let seconds = document.getElementById("seconds-input").value;

    // startStopBtn.innerHTML = "stop";

    //update html content
    startStopBtn.style.display = "none";
    document.getElementById("reset").style.display = "block";
    
    document.querySelector(".countdown-input").style.display = "none";
    document.querySelector(".countdown").style.display = "flex";

    //convert the given data to miliseconds
    givenTime = convertMiliseconds(day, hours, minutes, seconds) + 2000; // 2000 is added to make the countdown more accurate
    const startDate = new Date().getTime();
    
    const endDate = givenTime + startDate;

    x = setInterval(() => myTimer(startDate, endDate), 1000);

});

// to convert the given data to miliseconds
function convertMiliseconds(day, hours, minutes, seconds) {


    return (day * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
}


function myTimer(startDate, endDate) {

    const now = new Date().getTime();

    const distanceCovered = now - startDate;
    const distancePending = endDate - now;

    if (distancePending < 0) {
        clearInterval(x);
        title.innerHTML = "Times Up!";
        document.querySelector(".countdown").innerHTML = "Times Up!";
        document.querySelector(".countdown").style.fontSize = "15vw";
        document.querySelector(".countdown").style.fontWeight = "bold";
        document.querySelector('.progress').style.width = "100%";

        return;
    }

    //extract day
    let paintDay = Math.floor(distancePending / (24 * 60 * 60 * 1000));
    let paintHours = Math.floor((distancePending % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let paintMinutes = Math.floor((distancePending % (60 * 60 * 1000)) / (60 * 1000));
    let paintSeconds = Math.floor((distancePending % (60 * 1000)) / 1000);

    document.getElementById('days').innerHTML = paintDay = paintDay >= 10 ? paintDay : "0" + paintDay;
    document.getElementById('hours').innerHTML = paintHours = paintHours >= 10 ? paintHours : "0" + paintHours;
    document.getElementById('mins').innerHTML = paintMinutes = paintMinutes >= 10 ? paintMinutes : "0" + paintMinutes;
    document.getElementById('seconds').innerHTML = paintSeconds = paintSeconds >= 10 ? paintSeconds : "0" + paintSeconds;

    title.innerHTML = `${paintDay} : ${paintHours} : ${paintMinutes} : ${paintSeconds}`;
    //progress bar 
    const totalDistance = endDate - startDate

    const totalProgess = (distanceCovered / totalDistance) * 100;

    document.querySelector('.progress').style.width = totalProgess + "%";


}


//reset button
const resetBtn = document.getElementById("reset");

resetBtn.addEventListener('click' , () =>{


    clearInterval(x);

    title.innerHTML = "Countdown Timer";
    document.querySelector('.progress').style.width = "0%";

    // document.getElementById("days-input").placeholder = '00';
    document.getElementById("days-input").value = '';
    // document.getElementById("hours-input").placeholder = '00';
    document.getElementById("hours-input").value = '';
    // document.getElementById("minutes-input").placeholder = '00';
    document.getElementById("minutes-input").value = '';
    // document.getElementById("seconds-input").placeholder = '00';
    document.getElementById("seconds-input").value = '';

    
    document.querySelector(".countdown").innerHTML = originalContent;
    document.getElementById('days').innerHTML = '00';
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('mins').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';

    
    startStopBtn.style.display = "block";
    document.getElementById("reset").style.display = "none";
    document.querySelector(".countdown").style.display = "none";
    document.querySelector(".countdown-input").style.display = "flex";

});












