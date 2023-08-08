//import questionData from './quizQuestions';

const startButton = document.getElementById('start-btn'); //variable that gives access to the start button in the DOM
const questionContainer = document.getElementById('question-container'); //variable that gives access to the question container in the DOM
const questionElement = document.getElementById('question'); //variable that gives access to the questions in the DOM
const answerButtons = document.getElementById('answer-buttons'); //variable that gives access to the answer button in the DOM
const timeElement = document.getElementById('time'); //variable that gives access to the clock in the DOM
const writeCorrect = document.getElementById('right-count');  //variable that gives access to the score in the DOM
const resetButton = document.getElementById('reset-btn'); //variable that gives access to the restart button in the DOM
const audioElement = document.getElementById('myAudio'); // Get a reference to the correct audio element
const audioElementIncorrect = document.getElementById('myAudioIncorrect'); // Get a reference to the incorrect audio element
const audioElementCheer = document.getElementById('myAudioWellDone'); //geta reference to applause audion element

let currentQuestionIndex = 0; //index that indicates which question is currecnt being displayed
let time = 60; // seconds allowed to complete the quiz
let timerInterval;
let scoreCorrect = 0; //score holder for correct answers
let scoreWrong = 0; //score holder for incorrect answers
let quizStarted = false;

// Get a reference to the toggle switch and the question container
const toggleSwitch = document.getElementById('toggle-switch');  //variable that gives access to the toggle switch in the DOM
const scoreModal = document.getElementById('score-modal');  //variable that gives access to the score modal in the DOM
const scoreButtons = document.getElementById('score-buttons'); //variable that gives access to the score button in the DOM



var modal = document.querySelector('.modal');  //variable that gives access to the input modal in the DOM


var nameInput = document.querySelector('#name-input');  //variable that gives access to the name input label in the DOM
var formEl = document.querySelector('#user-form'); //variable that gives access to the user form that holds the user input in the DOM

var highArray = [];  //writes the text into an array of objects

scoreModal.style.display = 'none'; // Hide the container

startButton.addEventListener('click', startQuiz); //listens for the start button to be clicked and starts the quiz
resetButton.addEventListener('click', resetQuiz); //listens for the restart button to be clicked and starts the quiz

function startQuiz() {
    //scoreModal.style.display = 'none';
    startButton.disabled = true;
    startButton.style.display = 'none';
    questionContainer.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);
    updateQuestion();
}

//function that restarts the quiz and resets the values
function resetQuiz() {
    scoreCorrect = -100; //set to negative number because writeRight() will set it to 0.
    currentQuestionIndex = 0;
    time = 60;
    writeRight();
    startQuiz();
}

function updateQuestion() { //function that updates the questions in the questions container
    clearQuestion(); //function that clears previous question from the contatiner if it exist
    const question = questionData[currentQuestionIndex]; //stores the current questions into a const for easier, cleaner use in function
    questionElement.innerText = question.question; //moves question to the display text
    question.answers.forEach(answer => {
        const button = document.createElement('button'); //creates a button
        button.innerText = answer.text; //changes the inner text of the button
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
    });
}
//function for writing the score for correct answers. 100 point per correct.
function writeRight() {
    scoreCorrect = scoreCorrect + 100;
    writeCorrect.innerText = scoreCorrect;
}


//function that clears the question text in preperation for the new question's text
function clearQuestion() {
    questionElement.innerText = '';
    answerButtons.innerHTML = '';
}


function addCorrect() {

    console.log('Correct ', scoreCorrect);
}


function selectAnswer(correct) {
    if (correct) {
        currentQuestionIndex++;
        writeRight();
        playAudio();
        if (currentQuestionIndex < questionData.length) {
            updateQuestion();
            addCorrect();

        } else {
            endQuiz();
            addCorrect();

        }
    } else {
        currentQuestionIndex++;
        //writeWrong();
        time -= 2;
        playAudioIncorrect();
        if (currentQuestionIndex < questionData.length) {
            updateQuestion();
            //addIncorrect();

        } else {
            endQuiz();
            //addIncorrect();

        }
    }

}

//Function to open modal
function openModal() {
    modal.style.display = 'block';
    //modalEl.classList.add('block');
    console.log('openModal') //check added to make sure fuction opens
}

//Function to close modal
function closeModal() {
    modal.style.display = 'none';
    console.log("modal should be closed");
}

//Outputs the user info to the window
function showUserData() {
    var userData = addToArray();

    console.log(userData);

}

//function that sets the data to an empty string
function clearData() {
    nameInput.value = '';
}

//function that gets the JSON array from the local storage and converts it to a JavaScript array
function addToArray() {
    var rawData = localStorage.getItem('users');
    var parse = JSON.parse(rawData) || [];

    return parse;
}

//function that converts the array into a JSON value so it can be used in local storage then send it into local storage
function saveUserData(arr) {
    var jasonVal = JSON.stringify(arr);
    localStorage.setItem('users', jasonVal);
}

//function that retrieves the user input 
function getUserInput(eventObj) {
    eventObj.preventDefault(); //prevent the default behavior so the form doesn't prematurely submit

    var userScore = {
        name: nameInput.value,
        score: scoreCorrect
    };
    var usersArray = addToArray();
    usersArray.push(userScore);

    saveUserData(usersArray);

    clearData();
    writeScores();
    // scoreModal.style.display = 'none'; // Hide the container

    if (!quizStarted) {
        resetButton.style.display = 'none'; //shows the reset button
    }


}


// Play the audio for correct answer
function playAudio() {
    audioElement.play();
}

// Pause the audio for correct answers
function pauseAudio() {
    audioElement.pause();
}

// Play the audio for incorrect answers
function playAudioIncorrect() {
    audioElementIncorrect.play();
}

// Pause the audio for incorrect answers
function pauseAudioIncorrect() {
    audioElementIncorrect.pause();
}

// Play the audio for applause when the quiz is over
function playAudioCheer() {
    audioElementCheer.play();
}

// Pause the audio for applause when the quiz is over
function pauseAudioCheer() {
    audioElementCheer.pause();
}

//fuction that updates the time and subtract and extra second afer wrong answer
function updateTimer() {
    timeElement.innerText = time;
    if (time <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        time--;
    }
}
function writeScores() { //function that writes the saved scores to modal for display
    if (!quizStarted) { //prevents the array from doubling itself upon start
        quizStarted = true;

    }
    highArray = addToArray();
    for (let i = 0; i < highArray.length; i++) {
        const currentObject = highArray[i];  //variable that becomes the current object in the array based on the index in the loop
        const button = document.createElement('button');  //creates a variable to give access to the button
        button.innerText = 'Name: ' + currentObject.name + '  Score: ' + currentObject.score; //adds text to the button
        // button.addEventListener('click', () => selectAnswer(answer.correct));
        button.classList.add('btn-score'); //adds a class to the button for css styling
        scoreButtons.appendChild(button);

        console.log('Object name:', currentObject.name);
        console.log('Object value:', currentObject.score);
    }
}

function endQuiz() {
    playAudioCheer();
    clearInterval(timerInterval); //clears the timer
    questionContainer.style.display = 'none'; //hides the questoin container
    resetButton.style.display = 'block'; //shows the reset button
    openModal(); //opens the modal for name entry
    formEl.addEventListener('submit', getUserInput);
    formEl.addEventListener('submit', closeModal);
    //writeScores();
    // Display high score form and save the score using localStorage
    // Add an event listener to the toggle switch

}


toggleSwitch.addEventListener('change', () => {
    // Toggle the visibility of the question container
    if (toggleSwitch.checked) {
        scoreModal.style.display = 'block'; // Show the container
        if (!quizStarted) {
            writeScores();
           
        }
    } else {
        scoreModal.style.display = 'none'; // Hide the container
    }
});