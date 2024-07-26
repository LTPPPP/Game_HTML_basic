const words = ["apple", "banana", "cherry", "orange", "grape", "kiwi", "lemon", "melon", "peach", "pear", "plum", "strawberry", "blueberry", "raspberry", "blackberry", "pineapple", "watermelon", "coconut", "papaya", "mango"]; // Add more words as needed

let wordIndex = 0;
let score = 0;
let startTime;
let endTime;
let timer;

const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

function startGame() {
    wordIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    inputElement.value = '';
    inputElement.focus();
    generateWord();
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeElement.textContent = `Time: ${elapsedTime}s`;
}

function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex];
}

function checkWord() {
    if (inputElement.value.trim().toLowerCase() === wordElement.textContent) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        generateWord();
        inputElement.value = '';
    }
}

inputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkWord();
    }
});

inputElement.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        clearInterval(timer);
        startGame();
    }
});

startGame();
