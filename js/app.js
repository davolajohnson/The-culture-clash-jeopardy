/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/


const questions = document.querySelectorAll('.question');
const modal = document.getElementById('question-modal');
const overlay = document.getElementById('overlay');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');  // Input for answers
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const scoreElement = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message'); // For showing feedback

let score = 0;
let timer;
let timeRemaining = 20;
let currentButton; // To keep track of the current question button

// Add event listeners for each question button
questions.forEach(button => {
    button.addEventListener('click', function () {
        if (!button.classList.contains('answered')) {
            questionText.textContent = this.dataset.question;
            modal.style.display = 'block';
            overlay.style.display = 'block';
            answerInput.value = '';  // Clear the input field for the new question
            feedbackMessage.textContent = '';  // Clear any previous feedback
            this.classList.add('answered');
            currentButton = button; // Store the current question button
            startTimer(button);
        }
    });
});

// Start the countdown timer when a question is selected
function startTimer(button) {
    timeRemaining = 20; // Reset timer
    timerDisplay.textContent = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleTimeout(button);
        }
    }, 1000);
}

// Handle timeout by deducting points if the time runs out
function handleTimeout(button) {
    score -= parseInt(button.textContent.replace('$', ''), 10);
    updateScore();
} 

    // Close the modal and stop the timer
function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    clearInterval(timer);
}

// Check the player's answer and update the score
function checkAnswer() {
    const input = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = currentButton.dataset.answer.trim().toLowerCase();

    if (input === correctAnswer) {
        score += parseInt(currentButton.textContent.replace('$', ''), 10);
        document.getElementById('feedback-message').textContent = "Correct!";
    } else {
        score -= parseInt(currentButton.textContent.replace('$', ''), 10);
        document.getElementById('feedback-message').textContent = "Incorrect!";
    }

    updateScore();
    setTimeout(closeModal, 1500);
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = score;
}