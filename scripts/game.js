import { imageLoader } from "./sprite.js";

export function Game() {
  // Singleton pattern
  if (Game.instance) {
    return this;
  }

  Game.instance = this;
  this.height = 820;
  this.width = 1180;
  this.score = 0;
  this.life = 2;
  this.player = new Player(this);

  this.render = (ctx) => {
    ctx.clearRect(0, 0, this.width, this.height);
    drawLineOnTop(ctx);
    drawScore(ctx);

    this.player.render(ctx);
  };

  this.movePlayer = (command) => {
    const acceptedMoves = {
      pressDown: {
        right() {
          this.player.rightPressed = true;
        },
        left() {
          this.player.leftPressed = true;
        },
      },
      pressUp: {
        right() {
          this.player.rightPressed = false;
        },
        left() {
          this.player.leftPressed = false;
        },
      },
    };

    const { typePress, keyPressed } = command;
    const moveFunction = acceptedMoves[typePress][keyPressed];
    if (moveFunction) {
      moveFunction.bind(this)();
    }
  };

  const drawLineOnTop = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(this.width, 90);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0DA60A";
    ctx.stroke();
    ctx.closePath();
  };

  const drawScore = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = " 20px Press_start_2p";
    ctx.fillText("SCORE", 46, 70);
    ctx.fillText("LIVES", 800, 70);

    ctx.fillStyle = "green";
    ctx.fillText(this.score, 170, 70);

    for (let i = 0; i < this.life; i++) {
      imageLoader.player(ctx, 940 + i * 100, 40);
    }

    ctx.closePath();
  };

  return this;
}

function Player(game) {
  this.rightPressed = false;
  this.leftPressed = false;

  this.x = game.width / 2;

  this.render = (ctx) => {
    if (this.rightPressed) {
      playerToRight();
    }
    if (this.leftPressed) {
      playerToLeft();
    }
    imageLoader.player(ctx, this.x - 30, game.height - 60);
  };

  const playerToRight = () => {
    this.x += 6;
    const maxWidth = game.width - 60;
    if (this.x >= maxWidth) {
      this.x = maxWidth;
    }
  };

  const playerToLeft = () => {
    this.x -= 6;
    const minWidth = 60;
    if (this.x <= minWidth) {
      this.x = minWidth;
    }
  };
}

