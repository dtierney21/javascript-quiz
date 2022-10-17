/* Psuedo Code
 * Click a start buttom that starts a displayed countdown timer (60 seconds)
 * Present the first question
 * Allow user to select an answer
 * If the answer is incorrect subtract 5 seconds from the timer
 * If the answer is correct, award the user points
 * Display a message to the User to tell them if they were correct or wrong
 * Present the next question
 * When the timer reaches zero stop the game
 * When the user answers all the questions stop the game
 * Prompt the user for their Initials
 * allow the user to submit their initials
 * Store the initials and scrore in a local storage array
 * Allow the user to view Highscores
 * Display the array of highscores
 * Sort DESC
 * Allow the user to clear the highscores
 * Allow the user to play again
 *Display start buton
 */

// Set the HTML elements to variables
var highscoresEl = document.querySelector('#viewHighscores');
var timerEl = document.querySelector('#timer');
var headingEl = document.querySelector('#heading');
var textBodyEl = document.querySelector('#textBody');
var buttonsEl = document.querySelector('#buttons');
var optionsEl = document.querySelector('#options');
var messageEl = document.querySelector('#message');

// Remove the bullets/formating from the List Items
optionsEl.style.listStyleType = 'none';

// Set the initial value of the timer
var secondsLeft = 60;

// Initialize the variable to control the questions and score
var count = 0;
var score;
var initials;
var scores = [''];

// Array of questions
var questions = [
    'Inside which HTML element do we put JavaScript?',
    'Where is the correct place to insert JavaScript?',
    'What is the correct syntax for referring to an external script called "xxx.js"?',
    'The external JavaScript file must contain the <script> tag.',
    'How do you write "Hello World" in an alert box?',
    'How do you create a function in JavaScript?',
    'How do you call a function named "myFunction"?',
    'How do you write an IF statement in JavaScript?',
    'How do you write an IF statement for executing some code if "i" is NOT equal to 5?',
    'How does a WHILE loop start?',
];

// Array of options for each question
var options = [
    ['<js>', '<scripting>', '<script>', 'javascript'],
    ['Both the <head> and <body> sections', '<head> section', '<body> section'],
    ['<script name="xxx.js">', '<script src="xxx.js">', 'script href="xxx.js">'],
    ['False', 'True'],
    ['msg("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");'],
    ['function:myFunction()', 'function myFunction()', 'function = myFunction()'],
    ['call function myFunction()', 'myFunction()', 'call myFunction()'],
    ['if i == 5 then', 'if 1 = 5 then', 'if 1 = 5', 'if (i==5)'],
    ['if (i <> 5)', 'if i <> 5', 'if i != 5 then', 'if (i != 5)'],
    ['while i = 1 to  10', 'while (i <= 10; i++)', 'while (i <=1 0)'],
];

// Array of the correct answer for each question
var correctAnswers = [
    '<script>',
    '<body> section',
    '<script src="xxx.js">',
    'True',
    'msg("Hello World");',
    'function myFunction()',
    'myFunction()',
    'if (i==5)',
    'if (i != 5)',
    'while (i <=1 0)',
];

// Remove all child nodes between questions
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Set interval function for timer
function setTime() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        //var timeRemaining = document.createElement('p');
        timerEl.textContent = 'Time: ' + secondsLeft;
        //timerEl.appendChild(timeRemaining);
        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            gameover();
        }
    }, 1000);
}

// Check to see if the correct answer was selected
function checkAnswer(selection, answer) {
    console.log(selection);
    console.log(answer);
    if (selection == answer) {
        messageEl.textContent = 'Correct!';
    } else {
        messageEl.textContent = 'Wrong!';
    }
}

// Add the user's score to the highscores list
function setHighscores(initials, score) {
    scores.push(initials + score);
    localStorage.setItem('highscores', scores);
}

// On page load, display the instructions and start button
document.addEventListener('DOMContentLoaded', initializeQuiz);

// Create the first screen of the quiz with the instructions and start button
function initializeQuiz() {
    headingEl.textContent = 'Coding Quiz Challenge';
    textBodyEl.textContent =
        'Try to answer the following code-realted questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!';

    var start = document.createElement('li');
    var startBtn = document.createElement('button');
    startBtn.setAttribute('Id', 'startBtn');
    startBtn.appendChild(document.createTextNode('Start Quiz!'));
    start.appendChild(startBtn);
    buttonsEl.appendChild(start);
    startGame();

    var highscoreBtn = document.createElement('button');
    highscoreBtn.appendChild(document.createTextNode('Highscores'));
    highscoreBtn.setAttribute('Id', 'hsBtn');
    highscoresEl.appendChild(highscoreBtn);
    displayHighscores();
}

// handle the start of the game
function startGame() {
    document.getElementById('startBtn').addEventListener('click', function (e) {
        setTime();
        nextQuestion();
    });
}

// Display the next question in the quiz
function nextQuestion() {
    removeAllChildNodes(buttonsEl);
    removeAllChildNodes(optionsEl);
    if (count < questions.length) {
        headingEl.textContent = 'Question ' + (count + 1);
        textBodyEl.textContent = questions[count];
        for (var i = 0; i < options[count].length; i++) {
            var option = document.createElement('li');
            var button = document.createElement('button');
            button.setAttribute('Id', 'selection'), button.appendChild(document.createTextNode(options[count][i]));
            option.appendChild(button);
            optionsEl.appendChild(option);
        }
        getAnswer();
    } else {
        gameover();
    }
}

// Check the selected answer to determine if it is correct
function getAnswer() {
    document.querySelector('ul').addEventListener('click', function (e) {
        var selectedAnswer = e.target.textContent;
        var correctAnswer = correctAnswers[count];
        checkAnswer(selectedAnswer, correctAnswer);

        count++;
        nextQuestion();
    });
}

// When the game is completed, display the results to the users and give them options to play again or view the highscores
function gameover() {
    removeAllChildNodes(optionsEl);
    messageEl.textContent = '';
    headingEl.textContent = 'All Done!';
    textBodyEl.textContent = 'Your Final Score: ' + score;
    var input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    optionsEl.appendChild(input);
    score = secondsLeft;
    setHighscores(score);

    var highscoreBtn = document.createElement('button');
    highscoreBtn.appendChild(document.createTextNode('View Highscores'));
    highscoreBtn.setAttribute('Id', 'hsBtn');
    buttonsEl.appendChild(highscoreBtn);
    displayHighscores();

    var replayBtn = document.createElement('button');
    replayBtn.appendChild(document.createTextNode('Play Again!'));
    replayBtn.setAttribute('Id', 'startBtn');
    buttonsEl.appendChild(replayBtn);
    initializeQuiz();
}

// display the highscores
function displayHighscores() {
    document.getElementById('hsBtn').addEventListener('click', function (e) {
        removeAllChildNodes(optionsEl);
        headingEl.textContent = 'Highscores';
        textBodyEl.textContent = '';
        var allScores = Array.from(localStorage.getItem('highscores'));
        console.log(allScores.length);
        allScores.sort();
        for (var i = 0; i < allScores.length; i++) {
            var score = document.createElement('li');
            score.appendChild(document.createTextNode(scores[i]));
            optionsEl.appendChild(score);
        }
    });
}
