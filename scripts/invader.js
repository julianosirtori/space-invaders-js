import { VisualEffects } from "./audio.js";

export function GroupOfInvaders(game) {
  this.lines = 2;
  this.columns = 8;
  this.invaders = [];
  this.speed = 1;
  this.invaderWidth = 80;

  const minWidth = 0;

  const maxWidth = game.width - this.columns * this.invaderWidth;
  this.x = 60;
  this.y = 100;

  this.createdInvaders = () => {
    for (let line = 0; line < this.lines; line++) {
      this.invaders[line] = [];
      for (let col = 0; col < this.columns; col++) {
        this.invaders[line][col] = new Invader(game);
      }
    }
  };

  this.findDirection = () => {
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

  this.moveGroup = () => {
    this.x = this.direction ? this.x + this.speed : this.x - this.speed;
    if (this.nextLine) {
      this.y += 15;
      if (this.y >= game.height - 200) {
        game.player.isDead = true;
      }
    }
  };
}

export function Invader(game) {
  this.width = 50;
  this.x;
  this.y;
  this.type;
  this.isAlive = true;
  this.visualEffects = new VisualEffects();

  this.destroy = () => {
    this.isAlive = false;
    this.visualEffects.playExplosion();
  };
}

