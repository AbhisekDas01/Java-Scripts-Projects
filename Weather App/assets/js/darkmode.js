//store the color profile in a local storage to keep the color profile when the user refreshes the page
const colorProfile = localStorage.getItem('color-profile');

if (colorProfile === 'dark') {
    document.body.classList.remove('lightMode');
}
else if (colorProfile === 'light') {
    document.body.classList.add('lightMode');
}
else {


    //get the system color profile

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkMode) {
        document.body.classList.remove('lightMode');
        // console.log(darkMode);
    }
    else {
        document.body.classList.add('lightMode');
    }


    // const lightmodeBtn = document.querySelector('.light-mode');
    // const darkModeBtn = document.querySelector(".darkmode-btn");



}

const modeSwitch = document.querySelector(".darkmode-container");

modeSwitch.addEventListener ("click", function () {
    document.body.classList.toggle('lightMode');

    if(document.body.classList.contains('lightMode'))
    {
        localStorage.setItem('color-profile' , 'light' );
    }
    else
    {
        localStorage.setItem('color-profile' , 'dark' );
    }

});