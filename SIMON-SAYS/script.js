const colors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userPattern = [];

let level = 0;
let score = 0;

let started = false;

const startBtn = document.getElementById("start-btn");
const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const buttons = document.querySelectorAll(".color-btn");

// Start Game
startBtn.addEventListener("click", startGame);

function startGame() {

    if (started) return;

    started = true;

    level = 0;
    score = 0;

    gamePattern = [];
    userPattern = [];

    message.textContent = "Watch the sequence!";

    nextLevel();
}

// Next Level
function nextLevel() {

    userPattern = [];

    level++;

    levelText.textContent = `Level ${level}`;
    scoreText.textContent = `Score ${score}`;

    const randomColor =
        colors[Math.floor(Math.random() * 4)];

    gamePattern.push(randomColor);

    playSequence();
}

// Flash Button
function flashButton(color) {

    const button =
        document.querySelector(`.${color}`);

    button.classList.add("active");

    setTimeout(() => {

        button.classList.remove("active");

    }, 400);
}

// Play Sequence
function playSequence() {

    let i = 0;

    const interval = setInterval(() => {

        flashButton(gamePattern[i]);

        i++;

        if (i >= gamePattern.length) {

            clearInterval(interval);

        }

    }, 800);
}

// User Clicks
buttons.forEach(button => {

    button.addEventListener("click", handleUserClick);

});

function handleUserClick() {

    if (!started) return;

    const color = this.dataset.color;

    userPattern.push(color);

    flashButton(color);

    checkAnswer();
}

// Check Answer
function checkAnswer() {

    const currentIndex =
        userPattern.length - 1;

    if (
        userPattern[currentIndex] !==
        gamePattern[currentIndex]
    ) {

        gameOver();
        return;
    }

    if (
        userPattern.length ===
        gamePattern.length
    ) {

        score += 10;

        scoreText.textContent =
            `Score ${score}`;

        setTimeout(() => {

            nextLevel();

        }, 1000);
    }
}

// Game Over
function gameOver() {

    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 400);

    document.querySelector(".simon-board")
    .classList.add("shake");

    setTimeout(() => {
        document.querySelector(".simon-board")
            .classList.remove("shake");
    }, 400);

    message.textContent =
        `Game Over! Final Score: ${score}`;

    levelText.textContent = "Level 0";

    started = false;

    gamePattern = [];
    userPattern = [];

    level = 0;
}

