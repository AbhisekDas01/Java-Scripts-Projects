document.addEventListener('DOMContentLoaded', function () {
    // all the elements that we need to change

    //containers
    const otherStats = document.querySelector('.other-stats');
    const rankContainer = document.querySelector(".rank-container");

    // input field 
    const userInput = document.getElementById("UserName");
    const searchButton = document.getElementById("search-btn");
    // main details 
    const userName = document.getElementById('update-name');
    const acceptanceCircle = document.querySelector('.progress-ring__circle-right');
    const acceptancePercantage = document.getElementById("percantage");
    const totalQuestion = document.getElementById("update-total");
    //easy questions
    const easyCircle = document.querySelector(".progress-ring-easy");
    const easyText = document.getElementById("percantage-easy");
    const updateEasy = document.getElementById("update-easy");

    //medium questions
    const mediumCircle = document.querySelector(".progress-ring-medium");
    const mediumText = document.getElementById("percantage-medium");
    const updateMedium = document.getElementById("update-medium");

    //hard questions
    const hardCircle = document.querySelector(".progress-ring-hard");
    const hardText = document.getElementById("percantage-hard");
    const updateHard = document.getElementById("update-hard");

    // rank Section 
    const updateRank = document.getElementById("rank-text");

    
    //username validity check function
    function isValidUser(user){
        if(user.trim() === "")
        {
            alert("Username should not be empty!");
            return false;
        }

        //to test the username contains these elements only and max 15chars
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(user);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUserDetails(user) {

        
        const url = `https://leetcode-stats-api.herokuapp.com/${user}`;
        
        try{

            //disable search btn when searching
            userName.innerHTML = 'LeetCode User Stats';
            searchButton.innerHTML = 'Searching..';
            searchButton.disabled = true;
            otherStats.style.display = 'none';
            rankContainer.style.display = 'none';

            // update all the circles before researcing
            updateProgressBar(acceptanceCircle , 0);
            updateProgressBar(easyCircle , 0);
            updateProgressBar(mediumCircle,0);
            updateProgressBar(hardCircle , 0);
            acceptancePercantage.innerHTML = '_ _%';
            easyText.innerHTML = '_ _%';
            mediumText.innerHTML = '_ _%';
            hardText.innerHTML = '_ _%';

            const response = await fetch(url);
            
            
            if(!response.ok)
            {
                throw new Error("Unable to fetch user Data!");  
            }

            const fetchedData = await response.json();

            if(fetchedData.status === "error")
            {
                throw new Error("User doesn't exists!");
            }
            // console.log(fetchedData);

            displayUserData(fetchedData , user);

        }
        catch(err){

            alert(`${err.message}`);

        }
        finally{
            searchButton.innerHTML = 'Search';
            searchButton.disabled = false;
        }

    }

    //updating the progress bars
    function updateProgressBar(circle , progress)
    {
        const radius = circle.getAttribute("r");

        let circumfarence = radius*Math.PI*2;
        
        circle.style.strokeDasharray = circumfarence;
        circle.style.strokeDashoffset = circumfarence*(100-progress)/100;

    }
    //displaying user data
    function displayUserData(fetchedData , user)
    {
        //ectract all the data
        //total question
        const totalQuestions = fetchedData.totalQuestions;
        const totalQuestionSolved = fetchedData.totalSolved;
        //easy question
        const totalEasyQuestionSolved = fetchedData.easySolved;
        const totalEasyQuestion = fetchedData.totalEasy;
        //medium question
        const mediumQuestionSolved = fetchedData.mediumSolved;
        const totalMediumQuestion = fetchedData.totalMedium;
        //hard question 
        const hardQuestionSolved = fetchedData.hardSolved;
        const totalHardQuestion = fetchedData.totalHard;

        //acceptance and ranking 
        const totalAcceptance = fetchedData.acceptanceRate;
        const totalRanking = fetchedData.ranking;

        //insert to dom
        userName.innerHTML = `${user}`;
        totalQuestion.innerHTML = `${totalQuestionSolved}/${totalQuestions}`;
        updateEasy.innerHTML = `${totalEasyQuestionSolved}/${totalEasyQuestion}`;
        updateMedium.innerHTML = `${mediumQuestionSolved}/${totalMediumQuestion}`;
        updateHard.innerHTML = `${hardQuestionSolved}/${totalHardQuestion}`;
        updateRank.innerHTML = `${totalRanking}`;
        otherStats.style.display = 'grid';
        rankContainer.style.display = 'block';

        //update the cirlce
        acceptancePercantage.innerHTML = `${totalAcceptance}%`;
        updateProgressBar(acceptanceCircle , totalAcceptance);

        //easy tofixed(2) is used to take only 2 decimal places
        const easyPercantage = ((totalEasyQuestionSolved/totalEasyQuestion)*100).toFixed(2);
        easyText.innerHTML = `${easyPercantage}%`;
        updateProgressBar(easyCircle , easyPercantage);

        //medium

        const medPercantage = ((mediumQuestionSolved/totalMediumQuestion)*100).toFixed(2);
        mediumText.innerHTML = `${medPercantage}%`;
        updateProgressBar(mediumCircle , medPercantage);

        //hard
        const hardPercantage = ((hardQuestionSolved/totalHardQuestion)*100).toFixed(2);
        hardText.innerHTML = `${hardPercantage}%`;
        updateProgressBar(hardCircle , hardPercantage);



    }   

    //event lisener for search btn
    searchButton.addEventListener('click' , function(){

        const user = userInput.value;
        console.log("user : " , user); //to print user in console

        if(isValidUser(user))
        {
            fetchUserDetails(user);
        }
    })

});