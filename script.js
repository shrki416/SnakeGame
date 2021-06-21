document.addEventListener("keydown", whichKeyisPressed);

const snake = {
  Length: 10,
  SpeedinX: 0,
  SpeedinY: 5,
  PositioninX: 400,
  PositioninY: 250,
  selectedSpeedPositive: 5,
  selectedSpeedNegative: -5,
  pausedIntervalID: 1,
};

window.onload = () => {
  initializeGame();
  //   let FPS = 30;
  //   setInterval(drawEverything, 1000 / FPS);
};

function whichKeyisPressed(e) {
  const keyPressed = e.key;

  if (keyPressed === "ArrowDown" || keyPressed === "s") turnSnakeDown();
  if (keyPressed === "ArrowUp" || keyPressed === "w") turnSnakeUp();
  if (keyPressed === "ArrowLeft" || keyPressed === "a") turnSnakeLeft();
  if (keyPressed === "ArrowRight" || keyPressed === "d") turnSnakeRight();
  if (keyPressed === " ") toggleGamePause();
}

function toggleGamePause() {
  //   if (!snake.pausedIntervalID) {
  snake.pausedIntervalID = setInterval(() => {
    drawEverythingElse();
    drawSnake();
  }, 200);
  //   } else clearInterval(pausedIntervalID);
}

function turnSnakeDown() {
  if (snake.SpeedinY === 0) {
    snake.SpeedinX = 0;
    snake.SpeedinY = snake.selectedSpeedPositive;
  }

  drawSnake();
}

function turnSnakeUp() {
  if (snake.SpeedinY === 0) {
    snake.SpeedinX = 0;
    snake.SpeedinY = snake.selectedSpeedNegative;
  }

  drawSnake();
}

function turnSnakeLeft() {
  if (snake.SpeedinX === 0) {
    snake.SpeedinY = 0;
    snake.SpeedinX = snake.selectedSpeedNegative;
  }

  drawSnake();
}

function turnSnakeRight() {
  if (snake.SpeedinX === 0) {
    snake.SpeedinY = 0;
    snake.SpeedinX = snake.selectedSpeedPositive;
  }

  drawSnake();
}

function drawSnake() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  snake.PositioninY += snake.SpeedinY;
  snake.PositioninX += snake.SpeedinX;

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(
    snake.PositioninX,
    snake.PositioninY,
    10,
    snake.Length
  );
}

function drawEverythingElse() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 500;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function initializeGame() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 500;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(400, 250, 10, snake.Length);
}
