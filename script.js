const snake = {
  speedInX: 0,
  speedInY: 1,
  positionX: 400,
  positionY: 250,
};

const apple = {
  positionX: 0,
  positionY: 0,
  size: 10,
  numberEaten: 0,
};

const gameSettings = {
  canvasWidth: 600,
  canvasHeight: 500,
  selectedSpeed: 1,
  isGameRunning: 0,
};

window.onload = () => {
  initializeGame();
};

document.addEventListener("keydown", whichKeyisPressed);

function whichKeyisPressed(e) {
  const keyPressed = e.key;

  if (keyPressed === " ") toggleGamePause();
  if (gameSettings.isGameRunning > 0) {
    if (keyPressed === "ArrowUp" || keyPressed === "w") turnSnakeUp();
    if (keyPressed === "ArrowDown" || keyPressed === "s") turnSnakeDown();
    if (keyPressed === "ArrowLeft" || keyPressed === "a") turnSnakeLeft();
    if (keyPressed === "ArrowRight" || keyPressed === "d") turnSnakeRight();
  }
}

function toggleGamePause() {
  if (gameSettings.isGameRunning) {
    clearInterval(gameSettings.isGameRunning);
    gameSettings.isGameRunning = 0;
  } else {
    gameSettings.isGameRunning = setInterval(() => {
      drawEverythingElse();
      drawSnake();
      isSnakeInbounds();
      didEatApple();
    }, 25);
  }
}

function turnSnakeDown() {
  if (snake.speedInY === 0) {
    snake.speedInX = 0;
    snake.speedInY = gameSettings.selectedSpeed;
  }
}

function turnSnakeUp() {
  if (snake.speedInY === 0) {
    snake.speedInX = 0;
    snake.speedInY = -gameSettings.selectedSpeed;
  }
}

function turnSnakeLeft() {
  if (snake.speedInX === 0) {
    snake.speedInY = 0;
    snake.speedInX = -gameSettings.selectedSpeed;
  }
}

function turnSnakeRight() {
  if (snake.speedInX === 0) {
    snake.speedInY = 0;
    snake.speedInX = gameSettings.selectedSpeed;
  }
}

function drawSnake() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  snake.positionY += snake.speedInY;
  snake.positionX += snake.speedInX;

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(snake.positionX, snake.positionY, 10, 10);
}

function drawEverythingElse() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = gameSettings.canvasWidth;
  canvas.height = gameSettings.canvasHeight;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "red";
  canvasContext.fillRect(
    apple.positionX,
    apple.positionY,
    apple.size,
    apple.size
  );
}

function initializeGame() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 500;
  snake.positionX = canvas.width / 2;
  snake.positionY = canvas.height / 2;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(snake.positionX, snake.positionY, 10, 10);

  placeApple();
}

function isSnakeInbounds() {
  if (snake.positionX === 0 || snake.positionX > gameSettings.canvasWidth - 10)
    resetGame();
  if (snake.positionY === 0 || snake.positionY > gameSettings.canvasHeight - 10)
    resetGame();
}

function didEatApple() {
  if (
    snake.positionY >= apple.positionY &&
    snake.positionY <= apple.positionY + apple.size
  ) {
    if (
      snake.positionX >= apple.positionX &&
      snake.positionX <= apple.positionX + apple.size
    ) {
      apple.numberEaten++;
      placeApple();
    }
  }
}

function resetGame() {
  snake.speedInX = 0;
  snake.speedInY = -gameSettings.selectedSpeed;
  snake.positionX = gameSettings.canvasWidth / 2;
  snake.positionY = gameSettings.canvasHeight / 2;
  toggleGamePause();
  initializeGame();
}

function placeApple() {
  apple.positionX = Math.floor(Math.random() * (gameSettings.canvasWidth - 10));
  apple.positionY = Math.floor(
    Math.random() * (gameSettings.canvasHeight - 10)
  );
}
