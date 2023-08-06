//import questionData from './quizQuestions';

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const timeElement = document.getElementById('time');
const writeCorrect = document.getElementById('right-count');
const writeIncorrect = document.getElementById('wrong-count');
const resetButton = document.getElementById('reset-btn');
const audioElement = document.getElementById('myAudio'); // Get a reference to the audio element
const audioElementIncorrect = document.getElementById('myAudioIncorrect'); // Get a reference to the audio element


let currentQuestionIndex = 0; //index that indicates which question is currecnt being displayed
let time = 60; // seconds
let timerInterval;
let scoreCorrect = 0; //score holder for correct answers
let scoreWrong = 0; //score holder for incorrect answers

startButton.addEventListener('click', startQuiz);
resetButton.addEventListener('click', resetQuiz);

function startQuiz() {
    startButton.disabled = true;
    startButton.style.display = 'none';
    questionContainer.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);
    updateQuestion();
}

function resetQuiz() {
    scoreCorrect = -100;
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
    clearInterval(timerInterval);
    questionContainer.style.display = 'none';
    // Display high score form and save the score using localStorage
}

// const questions = [
//     {
//         question: 'What is JavaScript?',
//         answers: [
//             { text: 'A programming language', correct: true },
//             { text: 'A type of coffee', correct: false },
//             { text: 'A car brand', correct: false },
//         ]
//     },
//     // Add more questions
//];
