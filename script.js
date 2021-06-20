window.onload = () => {
  let FPS = 30;
  setInterval(drawEverything, 1000 / FPS);
};

function drawEverything() {
  const canvas = document.querySelector("#gameCanvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 500;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, 800, 500);
}
