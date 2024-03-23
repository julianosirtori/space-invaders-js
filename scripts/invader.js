import { VisualEffects } from "./audio.js";
import { ProjectileFactory, INVASOR } from "./projectile.js";

export class GroupOfInvaders {
  constructor(game) {
    this.game = game;

    this.lines = 2;
    this.columns = 8;
    this.invaders = [];
    this.speed = 1;
    this.invaderWidth = 80;

    this.scoreMultiplier = 200;

    this.projectiles = [];
    this.delayToShoot = 40;
    this.frame = 0;

    this.width = game.width;
    this.maxWidth = this.width - this.columns * this.invaderWidth;
    this.minWidth = 0;

    this.x = 60;
    this.y = 100;
  }

  createdInvaders() {
    for (let line = 0; line < this.lines; line++) {
      this.invaders[line] = [];
      for (let col = 0; col < this.columns; col++) {
        this.invaders[line][col] = new Invader(this.game);
      }
    }
  }

  findDirection() {
    if (this.x >= this.maxWidth) {
      this.direction = 0;
      this.nextLine = true;
      this.scoreMultiplier -= 10;

      this.speed += 1.2;
      return;
    }

    if (this.x <= this.minWidth) {
      this.direction = 1;
      this.nextLine = true;
      return;
    }

    this.nextLine = false;
  }

  moveGroup() {
    this.x = this.direction ? this.x + this.speed : this.x - this.speed;
    if (this.nextLine) {
      this.y += 15;
      if (this.y >= this.game.height - 200) {
        this.game.player.isDead = true;
      }
    }
  }

  prepareToShoot() {
    this.frame++;
    if (this.frame >= this.delayToShoot) {
      this.frame = 0;
      this.shoot();
    }
  }

  checkCollision() {
    for (let index = 0; index < this.projectiles.length; index++) {
      const projectile = this.projectiles[index];
      if (
        projectile.x > this.game.player.x - 20 &&
        projectile.x < this.game.player.x + 80 &&
        projectile.y > this.game.player.y - 20 &&
        projectile.y < this.game.player.y + 20
      ) {
        this.game.player.isDead = true;
      }
    }
  }

  shoot() {
    // find valid alive invaders
    const validInvadersIndexes = [];
    for (let line = 0; line < this.lines; line++) {
      for (let column = 0; column < this.columns; column++) {
        const invader = this.invaders[line][column];
        if (invader.isAlive) {
          validInvadersIndexes.push([line, column]);
        }
      }
    }

    //get a random invader
    const randomIndex = Math.floor(
      Math.random() * validInvadersIndexes.length + 1
    );

    const matrixIndex = validInvadersIndexes[randomIndex - 1];
    this.projectiles.push(
      this.invaders[matrixIndex[0]][matrixIndex[1]].shoot()
    );
  }
}

export class Invader {
  constructor(game) {
    this.game = game;
    this.screenHeight = game.height;

    this.width = 50;
    this.x;
    this.y;
    this.type;
    this.isAlive = true;

    this.visualEffects = new VisualEffects();
  }

  shoot() {
    const projectileFactory = new ProjectileFactory();
    return projectileFactory.makeProjectile(
      INVASOR,
      this.x + this.width / 1.5,
      this.y + 25
    );
  }

  destroy() {
    this.isAlive = false;
    this.visualEffects.playExplosion();
  }
}

