const gameSettings = {
  canvasWidth: 600,
  canvasHeight: 500,
  refreshRate: 150,
  isGameRunning: 0,
  snakeSize: 10,
  appleBaseSize: 10,
};

const snake = {
  speedInX: 0,
  speedInY: 0,
  positionX: [400, 400, 400, 400, 400],
  positionY: [250, 240, 230, 220, 210],
};

const apple = {
  positionX: 0,
  positionY: 0,
  size: 10,
  numberEaten: 0,
};

window.onload = () => {
  initializeGame();
};

function initializeGame() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = gameSettings.canvasWidth;
  canvas.height = gameSettings.canvasHeight;

  for (i = 0; i < 5; i++) {
    snake.positionX[i] = canvas.width / 2;
    snake.positionY[i] = canvas.height / 2;
  }

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(
    snake.positionX[0],
    snake.positionY[0],
    gameSettings.snakeSize,
    gameSettings.snakeSize
  );

  placeApple();
}

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
      didSnakeCollideWithSelf();
      didEatApple();
    }, refreshRate);
  }
}

function turnSnakeDown() {
  if (snake.speedInY === 0) {
    snake.speedInX = 0;
    snake.speedInY = gameSettings.snakeSize;
  }
}

function turnSnakeUp() {
  if (snake.speedInY === 0) {
    snake.speedInX = 0;
    snake.speedInY = -gameSettings.snakeSize;
  }
}

function turnSnakeLeft() {
  if (snake.speedInX === 0) {
    snake.speedInY = 0;
    snake.speedInX = -gameSettings.snakeSize;
  }
}

function turnSnakeRight() {
  if (snake.speedInX === 0) {
    snake.speedInY = 0;
    snake.speedInX = gameSettings.snakeSize;
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

function drawSnake() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  snake.positionX.pop();
  snake.positionY.pop();
  snake.positionX.unshift(snake.positionX[0] + snake.speedInX);
  snake.positionY.unshift(snake.positionY[0] + snake.speedInY);

  for (i = 0; i < snake.positionY.length; i++) {
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(
      snake.positionX[i],
      snake.positionY[i],
      gameSettings.snakeSize,
      gameSettings.snakeSize
    );
  }
}

function isSnakeInbounds() {
  if (
    snake.positionX[0] <= 0 ||
    snake.positionX[0] > gameSettings.canvasWidth - gameSettings.snakeSize
  )
    resetGame();
  if (
    snake.positionY[0] <= 0 ||
    snake.positionY[0] > gameSettings.canvasHeight - gameSettings.snakeSize
  )
    resetGame();
}

function didEatApple({ apple }) {
  if (
    doesCollide(
      apple.positionX,
      apple.positionY,
      apple.size,
      snake.positionX[0],
      snake.positionY[0],
      gameSettings.snakeSize
    )
  ) {
    // (
    //   snake.positionX[0] < apple.positionX + apple.size &&
    //   snake.positionX[0] + gameSettings.snakeSize > apple.positionX &&
    //   snake.positionY[0] < apple.positionY + apple.size &&
    //   snake.positionY[0] + gameSettings.snakeSize > apple.positionY
    // ) {
    apple.numberEaten++;
    placeApple();
    growSnake();
  }
}

function doesCollide(obj1X, obj1Y, obj1Size, obj2X, obj2Y, obj2Size) {
  if (
    obj1X < obj2X + obj2Size &&
    obj1X + obj1Size > obj2X &&
    obj1Y < obj2Y + obj2Size &&
    obj1Y + obj1Size > obj2Y
  )
    return true;
}

function growSnake() {
  snake.positionX.push(snake.positionX[0]);
  snake.positionY.push(snake.positionY[0]);
}

function resetGame() {
  snake.speedInX = 0;
  snake.speedInY = gameSettings.snakeSize;
  toggleGamePause();
  initializeGame();
  apple.numberEaten = 0;
}

function placeApple() {
  apple.size = Math.floor(Math.random() * gameSettings.appleBaseSize + 1);

  apple.positionX = Math.floor(
    Math.random() * (gameSettings.canvasWidth - apple.size)
  );
  apple.positionY = Math.floor(
    Math.random() * (gameSettings.canvasHeight - apple.size)
  );
}

//event listener for button

function applyGameSettings() {
  const canvasSizeSelected = document.getElementsByName("canvasSize");
  let canvasSize = "";

  for (let i = 0; i < canvasSizeSelected.length; i++) {
    if (canvasSizeSelected[i]) canvasSize = canvasSizeSelected[i].nodeValue;
  }
  if (canvasSize === "small") {
    gameSettings.canvasWidth = 300;
    gameSettings.canvasHeight = 300;
  } else if (canvasSize === "medium") {
    gameSettings.canvasWidth = 500;
    gameSettings.canvasHeight = 400;
  } else if (canvasSize === "large") {
    gameSettings.canvasWidth = 600;
    gameSettings.canvasHeight = 500;
  }

  const userDesiredSnakeSpeed = document.getElementsByName("snakeSpeed");

  for (let i = 0; i < userDesiredSnakeSpeed.length; i++) {
    if (userDesiredSnakeSpeed[i])
      gameSettings.refreshRate = parseInt(userDesiredSnakeSpeed[i].nodeValue);
  }

  const appleSizeSelected = document.getElementsByName("appleSize");

  for (let i = 0; i < appleSizeSelected.length; i++) {
    if (appleSizeSelected[i]) apple.size = appleSizeSelected[i].nodeValue;
  }
}
