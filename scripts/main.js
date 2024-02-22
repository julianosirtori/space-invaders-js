const canvas = document.querySelector("#canvas-painel");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", height);
canvas.setAttribute("height", width);

const ctx = canvas.getContext("2d");

const playerWidth = 75;
const playerHeight = 53;
let playerX = width / 2 - playerWidth;

async function loadFonts() {
  const font = new FontFace(
    "Press_start_2p",
    "url(assets/fonts/PressStart2P-Regular.ttf)"
  );
  const fontLoaded = await font.load();
  document.fonts.add(fontLoaded);
}

function drawLineOnTop() {
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(width, 100);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#0DA60A";
  ctx.stroke();
  ctx.closePath();
}

function drawScore() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = " 20px Press_start_2p";
  ctx.fillText("SCORE", 46, 70);
  ctx.fillText("LIVES", 600, 70);

  ctx.fillStyle = "green";
  ctx.fillText(0, 170, 70);
  ctx.closePath();
}

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(
    playerX,
    canvas.height - 40 - playerHeight,
    playerWidth,
    playerHeight
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLineOnTop();
  drawScore();
  drawPlayer();

  requestAnimationFrame(draw);
}

async function main() {
  await loadFonts();
  draw();
}

main();

