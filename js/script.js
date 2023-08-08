//import questionData from './quizQuestions';

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const timeElement = document.getElementById('time');
const writeCorrect = document.getElementById('right-count');  //variable that gives access to the score in the DOM
const writeIncorrect = document.getElementById('wrong-count');
const resetButton = document.getElementById('reset-btn');
const audioElement = document.getElementById('myAudio'); // Get a reference to the correct audio element
const audioElementIncorrect = document.getElementById('myAudioIncorrect'); // Get a reference to the incorrect audio element
const audioElementCheer = document.getElementById('myAudioWellDone'); //geta reference to applause audion element

let currentQuestionIndex = 0; //index that indicates which question is currecnt being displayed
let time = 60; // seconds allowed to complete the quiz
let timerInterval;
let scoreCorrect = 0; //score holder for correct answers
let scoreWrong = 0; //score holder for incorrect answers

// Get a reference to the toggle switch and the question container
const toggleSwitch = document.getElementById('toggle-switch');
const scoreModal = document.getElementById('simple-modal');
const scoreButtons = document.getElementById('score-buttons');

//Get modal element
// var modal = document.getElementById('simpleModal');

var modal = document.querySelector('.modal');
//Get opem modal button
// var modalBtn = document.getElementById('modalBtn');
// //Get close buttom
// var closeBtn = document.getElementsByClassName('closeBtn')[0];

var nameInput = document.querySelector('#name-input');
var formEl = document.querySelector('#user-form');

startButton.addEventListener('click', startQuiz); //listens for the start button to be clicked and starts the quiz
resetButton.addEventListener('click', resetQuiz);

function startQuiz() {
    startButton.disabled = true;
    startButton.style.display = 'none';
    questionContainer.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);
    updateQuestion();
}

function resetQuiz() {
    scoreCorrect = -100; //set to negative number because writeRight() will set it to 0.
    //scoreWrong = -1;
    currentQuestionIndex = 0;
    time = 60;
    writeRight();
    //writeWrong();
    startQuiz();
}

function updateQuestion() { //function that updates the questions in the questions container
    clearQuestion(); //function that clears previous question from the contatiner if it exist
    const question = questionData[currentQuestionIndex]; //stores the current questions into a const for easier, cleaner use in function
    questionElement.innerText = question.question; //moves question to the display text
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
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

// function writeWrong(){
//     scoreWrong = scoreWrong + 1;
//     writeIncorrect.innerText = scoreCorrect;
//}

function clearQuestion() {
    questionElement.innerText = '';
    answerButtons.innerHTML = '';
}

// function addIncorrect() {
//     scoreWrong = scoreWrong + 1;
//     console.log('Wrong ', scoreWrong);
//}

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
    //return scoreCorrect, scoreWrong;
}


//Listen for open click
// modalBtn.addEventListener('click', openModal);

//Listen for close click
// modalBtn.addEventListener('click', closeModal);

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

function clearData() {
    nameInput.value = '';
}

function addToArray() { //getUserData()
    var rawData = localStorage.getItem('users');
    var parse = JSON.parse(rawData) || [];

    return parse;
}

function saveUserData(arr) {
    var jasonVal = JSON.stringify(arr);
    localStorage.setItem('users', jasonVal);
}

function getUserInput(eventObj) {
    eventObj.preventDefault();

    var userScore = {
        name: nameInput.value,
        score: scoreCorrect
    };
    var usersArray = addToArray();
    usersArray.push(userScore);

    saveUserData(usersArray);

    clearData();


}





// function getUserInput(eventObj){
// // eventObj.preventDefault();
// let name = nameInput.value;

// // if (eventObj.keyCode ===13){ //checks to see if the enter key was pressed. 
// console.log('name input is: ', name);
// localStorage.setItem('name', name);
// }
// // }

// nameInput.addEventListener('keydown', getUserInput);
// formEl.addEventListener('submit', function(eventObj){
//     // eventObj.preventDefault(); 
// });



// Play the audio
function playAudio() {
    audioElement.play();
}

// Pause the audio
function pauseAudio() {
    audioElement.pause();
}

// Play the audio
function playAudioIncorrect() {
    audioElementIncorrect.play();
}

// Pause the audio
function pauseAudioIncorrect() {
    audioElementIncorrect.pause();
}

// Play the audio
function playAudioCheer() {
    audioElementCheer.play();
}

// Pause the audio
function pauseAudioCheer() {
    audioElementCheer.pause();
}


function updateTimer() {
    timeElement.innerText = time;
    if (time <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        time--;
    }
}

function endQuiz() {
    playAudioCheer();
    clearInterval(timerInterval);
    questionContainer.style.display = 'none';
    openModal();
    //Initial process to start task
    formEl.addEventListener('submit', getUserInput);
    formEl.addEventListener('submit', closeModal);

    // Display high score form and save the score using localStorage
    // Add an event listener to the toggle switch

}


toggleSwitch.addEventListener('change', () => {
    // Toggle the visibility of the question container
    if (toggleSwitch.checked) {
        scoreModal.style.display = 'block'; // Show the container
    } else {
        scoreModal.style.display = 'none'; // Hide the container
    }
});