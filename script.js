document.addEventListener("keydown", whichKeyisPressed);

const snake = {
  Length: 10,
  SpeedinX: 0,
  SpeedinY: 1,
  PositioninX: 400,
  PositioninY: 250,
  selectedSpeed: 1,
  isGameRunning: 0,
};

window.onload = () => {
  initializeGame();
  //   let FPS = 30;
  //   setInterval(drawEverything, 1000 / FPS);
};

function whichKeyisPressed(e) {
  const keyPressed = e.key;

  if (keyPressed === " ") toggleGamePause();
  if (snake.isGameRunning > 0) {
    if (keyPressed === "ArrowDown" || keyPressed === "s") turnSnakeDown();
    if (keyPressed === "ArrowUp" || keyPressed === "w") turnSnakeUp();
    if (keyPressed === "ArrowLeft" || keyPressed === "a") turnSnakeLeft();
    if (keyPressed === "ArrowRight" || keyPressed === "d") turnSnakeRight();
  }
}

function toggleGamePause() {
  if (snake.isGameRunning) {
    clearInterval(snake.isGameRunning);
    snake.isGameRunning = 0;
  } else {
    snake.isGameRunning = setInterval(() => {
      drawEverythingElse();
      drawSnake();
      isSnakeInbounds();
    }, 20);
  }
}

function turnSnakeDown() {
  if (snake.SpeedinY === 0) {
    snake.SpeedinX = 0;
    snake.SpeedinY = snake.selectedSpeed;
  }
}

function turnSnakeUp() {
  if (snake.SpeedinY === 0) {
    snake.SpeedinX = 0;
    snake.SpeedinY = -snake.selectedSpeed;
  }
}

function turnSnakeLeft() {
  if (snake.SpeedinX === 0) {
    snake.SpeedinY = 0;
    snake.SpeedinX = -snake.selectedSpeed;
  }
}

function turnSnakeRight() {
  if (snake.SpeedinX === 0) {
    snake.SpeedinY = 0;
    snake.SpeedinX = snake.selectedSpeed;
  }
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

function isSnakeInbounds() {
  if (snake.PositioninX === 0 || snake.PositioninX > 800) resetGame();
  if (snake.PositioninY === 0 || snake.PositioninY > 500) resetGame();
}

function resetGame() {
  snake.SpeedinX = 0;
  snake.SpeedinY = -snake.selectedSpeed;
  snake.Length = 10;
  snake.PositioninX = 400;
  snake.PositioninY = 250;
  toggleGamePause();
  initializeGame();
}
