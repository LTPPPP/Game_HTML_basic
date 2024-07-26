document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById("gameArea");
    const target = document.getElementById("target");
    const startBtn = document.getElementById("startBtn");
    const scoreDisplay = document.getElementById("score");
    let score = 0;
    let gameTimer;
    let gameTime = 30; // in seconds
    let mouseSpeed = 10; // default mouse speed

    // Function to start the game
    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        startBtn.disabled = true;
        startBtn.textContent = "Game in progress...";
        gameTimer = setInterval(() => {
            gameTime--;
            if (gameTime <= 0) {
                clearInterval(gameTimer);
                endGame();
            }
        }, 1000);
        generateTarget();
    }

    // Function to end the game
    function endGame() {
        clearInterval(gameTimer);
        startBtn.disabled = false;
        startBtn.textContent = "Start Game";
        gameTime = 30;
        target.style.display = "none";
        alert("Game over! Your final score is: " + score);
    }

    // Function to generate random position for the target
    function generateTarget() {
        const maxX = gameArea.clientWidth - target.clientWidth;
        const maxY = gameArea.clientHeight - target.clientHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        target.style.left = randomX + "px";
        target.style.top = randomY + "px";
        target.style.display = "block";
    }

    // Event listener for clicking on the target
    target.addEventListener("click", function () {
        score++;
        scoreDisplay.textContent = score;
        generateTarget();
    });
    // Event listener for missing the target
    gameArea.addEventListener("click", function (event) {
        if (event.target === gameArea) {
            score--;
            scoreDisplay.textContent = score;
        }
    });

    // Event listener for start button
    startBtn.addEventListener("click", startGame);
});
