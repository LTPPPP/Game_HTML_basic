const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;

const scoreText = document.createElement("p");
scoreText.classList.add("score");
document.body.appendChild(scoreText);

const foodSound = new Audio("sounds/food.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");

let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

let dx = box;
let dy = 0;

let ddx = 0;
let ddy = 0;

let score = 0;

document.addEventListener("keydown", (e) => {
    console.log(e.keyCode); // Add this line to check if key presses are detected
    if (e.keyCode === 37 && ddx !== box) {
        ddx = -box;
        ddy = 0;
    } else if (e.keyCode === 38 && ddy !== box) {
        ddx = 0;
        ddy = -box;
    } else if (e.keyCode === 39 && ddx !== -box) {
        ddx = box;
        ddy = 0;
    } else if (e.keyCode === 40 && ddy !== -box) {
        ddx = 0;
        ddy = box;
    }
});

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px Changa one";
    ctx.fillText(text, x, y);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function drawFood() {
    drawRect(food.x, food.y, box, box, "#ff0");
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        drawRect(snake[i].x, snake[i].y, box, box, "green");
    }
}

function updateScore() {
    score++;
    scoreText.innerHTML = "Score: " + score;
    foodSound.play();
}

function gameOver() {
    clearInterval(game);
    gameOverSound.play();
    drawText("Game Over!", 100, 200, "white");
}

function update() {
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    };

    if (head.x < 0 || head.y < 0 || head.x > (canvas.width - box) || head.y > (canvas.height - box)) {
        gameOver();
    }

    if (head.x === food.x && head.y === food.y) {
        updateScore();
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: head.x + ddx,
        y: head.y + ddy,
    };

    if (collision(newHead, snake)) {
        gameOver();
    }

    snake.unshift(newHead);
}

let game = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    update();
}, 100);