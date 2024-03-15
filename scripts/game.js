import { imageLoader } from "./sprite.js";

export function Game(ctx) {
  // Singleton pattern
  if (Game.instance) {
    return this;
  }

  Game.instance = this;
  this.ctx = ctx;
  this.height = 820;
  this.width = 1180;
  this.player = new Player(this);
  this.groupOfInvaders = new GroupOfInvaders(this);
  this.groupOfInvaders.createdInvaders();

  this.render = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawLineOnTop();
    drawScore();

    this.player.render();
    this.groupOfInvaders.render();
    checkCollision();
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
        space() {
          this.player.shoot();
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

  const checkCollision = () => {
    const invaders = this.groupOfInvaders.invaders;
    for (let row = 0; row < invaders.length; row++) {
      for (let col = 0; col < invaders[row].length; col++) {
        const invader = invaders[row][col];
        if (
          this.player.projectileX > invader.x &&
          this.player.projectileX < invader.x + 50 &&
          this.player.projectileY > invader.y &&
          this.player.projectileY < invader.y + 50 &&
          invader.isAlive
        ) {
          this.player.score += 100;
          invader.destroy();
          this.player.hit();
        }
      }
    }
  };

  const drawLineOnTop = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 90);
    this.ctx.lineTo(this.width, 90);
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "#0DA60A";
    this.ctx.stroke();
    this.ctx.closePath();
  };

  const drawScore = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = " 20px Press_start_2p";
    this.ctx.fillText("SCORE", 46, 70);
    this.ctx.fillText("LIVES", 800, 70);

    this.ctx.fillStyle = "green";

    this.ctx.closePath();
  };

  return this;
}

function Player(game) {
  this.rightPressed = false;
  this.leftPressed = false;
  this.score = 0;
  this.life = 2;
  this.direction = 0; // 0 to left and 1 to right
  this.nextLine = false;

  this.y = game.height - 60;
  this.x = game.width / 2;

  this.projectileY = this.y;
  this.projectileX = this.x;

  this.render = () => {
    const ctx = game.ctx;
    ctx.fillText(this.score, 170, 70);

    for (let i = 0; i < this.life; i++) {
      imageLoader.player(ctx, 940 + i * 100, 40);
    }

    if (this.rightPressed) {
      playerToRight();
    }
    if (this.leftPressed) {
      playerToLeft();
    }

    if (this.projectileY <= 0) {
      this.projectileY = this.y;
      this.projectileX = this.x;
    }

    if (this.projectileY !== this.y) {
      ctx.beginPath();
      this.projectileY -= 10;
      ctx.rect(this.projectileX, this.projectileY, 5, 5);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    }

    imageLoader.player(ctx, this.x - 30, this.y);
  };

  this.shoot = () => {
    if (this.projectileY === this.y) {
      this.projectileY++;
      this.projectileX = this.x;
    }
  };

  this.hit = () => {
    this.projectileY = this.y;
    this.projectileX = this.x;
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

function GroupOfInvaders(game) {
  this.lines = 3;
  this.columns = 8;
  this.invaders = [];
  this.speed = 5;
  const invaderWidth = 60;

  const minWidth = 0;

  const maxWidth = game.width - this.columns * invaderWidth;
  this.x = 60;
  this.y = 150;

  this.createdInvaders = () => {
    for (let line = 0; line < this.lines; line++) {
      this.invaders[line] = [];
      for (let col = 0; col < this.columns; col++) {
        this.invaders[line][col] = new Invader(game);
      }
    }
  };

  const renderInvaders = () => {
    const typesPerLine = {
      0: "yellow",
      1: "red",
      2: "green",
    };
    for (let line = 0; line < this.lines; line++) {
      const type = typesPerLine[line];
      for (let col = 0; col < this.columns; col++) {
        this.invaders[line][col].x = this.x + invaderWidth * col;
        this.invaders[line][col].y = this.y + 50 * line;
        this.invaders[line][col].type = type;
        this.invaders[line][col].render();
      }
    }
  };

  const findDirections = () => {
    if (this.x >= maxWidth) {
      this.direction = 0;
      this.nextLine = true;
      this.speed += 0.8;
      return;
    }

    if (this.x <= minWidth) {
      this.direction = 1;
      this.nextLine = true;
      return;
    }

    this.nextLine = false;
  };

  const moveGroup = () => {
    this.x = this.direction ? this.x + this.speed : this.x - this.speed;
    if (this.nextLine) {
      this.y += 15;
    }
  };

  this.render = () => {
    findDirections();
    renderInvaders();
    moveGroup();
  };
}

function Invader(game) {
  this.width = 50;
  this.x;
  this.y;
  this.type;
  this.isAlive = true;

  const types = {
    red: imageLoader.invasorRed,
    green: imageLoader.invasorGreen,
    yellow: imageLoader.invasorYellow,
  };

  this.render = () => {
    if (!this.isAlive) {
      return;
    }
    types[this.type](game.ctx, this.x, this.y);
  };

  this.destroy = () => {
    this.isAlive = false;
  };
}

