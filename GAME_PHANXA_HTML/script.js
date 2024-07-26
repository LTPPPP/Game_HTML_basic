document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById('startBtn');
    const block = document.getElementById('block');
    const result = document.getElementById('result');

    let gameRunning = false;
    let startTime, endTime;

    function startGame() {
        gameRunning = true;
        startBtn.style.display = 'none';
        block.style.backgroundColor = 'red';
        block.style.pointerEvents = 'none'; // Disable clicking before it turns green
        setTimeout(turnGreen, getRandomTime());
    }

    function getRandomTime() {
        return Math.floor(Math.random() * (5000 - 1000 + 1)) + 10000; // Random time between 10s and 30s
    }

    function turnGreen() {
        if (gameRunning) {
            block.style.backgroundColor = 'green';
            block.style.pointerEvents = 'auto'; // Enable clicking
            startTime = Date.now();
        }
    }

    function handleClick() {
        if (gameRunning) {
            endTime = Date.now();
            const reactionTime = (endTime - startTime) / 1000; // Convert to seconds
            result.textContent = `Your reaction time: ${reactionTime.toFixed(2)} seconds`;
            block.style.backgroundColor = 'red';
            block.style.pointerEvents = 'none'; // Disable clicking again
            gameRunning = false;
            setTimeout(startGame, getRandomTime());
        } else {
            result.textContent = "You clicked too early! Game over.";
            block.style.backgroundColor = 'red';
        }
    }

    startBtn.addEventListener('click', startGame);
    block.addEventListener('click', handleClick);
});
