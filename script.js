const snake = {
  speedInX: 0,
  speedInY: 0.1,
  positionX: [400, 400, 400, 400, 400],
  positionY: [250, 240, 230, 220, 210],
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
  selectedSpeed: 0.1,
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

  if (snake.positionY.length > 1) {
    snake.positionX.pop();
    snake.positionY.pop();
    snake.positionX.unshift(snake.positionX[0] + snake.speedInX);
    snake.positionY.unshift(snake.positionY[0] + snake.speedInY);
  } else {
    snake.positionX += snake.speedInX;
    snake.positionY += snake.speedInY;
  }

  for (i = 0; i < snake.positionY.length; i++) {
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(snake.positionX[i], snake.positionY[i], 10, 10);
  }
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
  snake.positionX[0] = canvas.width / 2;
  snake.positionY[0] = canvas.height / 2;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(snake.positionX[0], snake.positionY[0], 10, 10);

  placeApple();
}

function isSnakeInbounds() {
  if (
    snake.positionX[0] <= 0 ||
    snake.positionX[0] > gameSettings.canvasWidth - 10
  )
    resetGame();
  if (
    snake.positionY[0] <= 0 ||
    snake.positionY[0] > gameSettings.canvasHeight - 10
  )
    resetGame();
}

function didEatApple() {
  if (
    snake.positionX[0] < apple.positionX + apple.size &&
    snake.positionX[0] + 10 > apple.positionX &&
    snake.positionY[0] < apple.positionY + apple.size &&
    snake.positionY[0] + 10 > apple.positionY
  ) {
    apple.numberEaten++;
    placeApple();
    growSnake();
  }
}

function growSnake() {
  snake.positionX.push(snake.positionX[0]);
  snake.positionY.push(snake.positionY[0]);
}

function resetGame() {
  snake.speedInX = 0;
  snake.speedInY = -gameSettings.selectedSpeed;
  snake.positionX[0] = gameSettings.canvasWidth / 2;
  snake.positionY[0] = gameSettings.canvasHeight / 2;
  toggleGamePause();
  initializeGame();
  snake.positionX = [400, 400, 400, 400];
  snake.positionY = [250, 240, 230, 220];
  apple.numberEaten = 0;
}

function placeApple() {
  apple.size = Math.floor(Math.random() * 30 + 1);
  apple.positionX = Math.floor(
    Math.random() * (gameSettings.canvasWidth - apple.size)
  );
  apple.positionY = Math.floor(
    Math.random() * (gameSettings.canvasHeight - apple.size)
  );
}
