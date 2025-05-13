const WIN_SCORE = 2000;
const questions = document.querySelectorAll('.question');
const TOTAL_QUESTIONS = questions.length;

let score = 0;
let timer;
let timeRemaining = 20;
let currentButton = null;
let questionsAnswered = 0;
let isTimeUp = false;
let isModalOpen = false;

const modal = document.getElementById('question-modal');
const overlay = document.getElementById('overlay');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const feedbackMessage = document.getElementById('feedback-message');
const resetButton = document.getElementById('reset-btn');
const gameStatusMessage = document.getElementById('game-status-message');

function normalize(str) {
    return str.trim().toLowerCase();
}

function startTimer(button) {
    timeRemaining = 20;
    isTimeUp = false;
    timerDisplay.textContent = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            isTimeUp = true;
            handleTimeout(button);
        }
    }, 1000);
}

function handleTimeout(button) {
    const value = parseInt(button.textContent.replace('$', ''), 10) || 0;
    score -= value;
    updateScore();
    questionsAnswered++;
    button.classList.add('answered');
    checkGameStatus();
    closeModal();
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    clearInterval(timer);
    currentButton = null;
    isModalOpen = false;
}

function checkAnswer() {
    if (isTimeUp || !currentButton) return;

    const input = normalize(answerInput.value);
    const correctAnswer = normalize(currentButton.dataset.answer);
    const value = parseInt(currentButton.textContent.replace('$', ''), 10) || 0;

    if (input === "") {
        feedbackMessage.textContent = "Please enter an answer.";
        feedbackMessage.style.color = "orange";
        return;
    }
    if (input === correctAnswer) {
        score += value;
        feedbackMessage.textContent = "Correct!";
        feedbackMessage.style.color = "green";
    } else {
        score -= value;
        feedbackMessage.textContent = "Incorrect!";
        feedbackMessage.style.color = "red";
    }

    updateScore();
    questionsAnswered++;
    currentButton.classList.add('answered'); 
    checkGameStatus();
    setTimeout(closeModal, 1500);
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function checkGameStatus() {
    if (score >= WIN_SCORE) {
      gameStatusMessage.textContent = "🎉 You win!";
      gameStatusMessage.style.color = "green";
      endGame();
    } else if (score < 0 || questionsAnswered === TOTAL_QUESTIONS) {
      gameStatusMessage.textContent = "❌ Game over. Better luck next time!";
      gameStatusMessage.style.color = "red";
      endGame();
    }
  }

function endGame() {
    questions.forEach(button => {
        button.disabled = true;
        button.classList.add('answered');
        button.style.opacity = 0.5;
    });
    closeModal();
}
function resetGame() {
    score = 0;
    questionsAnswered = 0;
    currentButton = null;
    isTimeUp = false;
    updateScore();
    timerDisplay.textContent = 20;
    feedbackMessage.textContent = '';
    answerInput.value = '';
    gameStatusMessage.textContent = '';
    gameStatusMessage.style.color = '';

    questions.forEach(button => {
        button.disabled = false;
        button.classList.remove('answered');
        button.style.opacity = 1;
    });
}

questions.forEach(button => {
    button.addEventListener('click', function () {
        if (isModalOpen || button.classList.contains('answered')) return;

            questionText.textContent = this.dataset.question;
            modal.style.display = 'block';
            overlay.style.display = 'block';
            answerInput.value = '';
            feedbackMessage.textContent = '';
            feedbackMessage.style.color = '';
            currentButton = button;
            isModalOpen = true;

            startTimer(button);
        });
    });

resetButton.addEventListener('click', resetGame);


