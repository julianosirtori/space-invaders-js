import { VisualEffects } from "./audio.js";
import { ProjectileFactory, INVASOR } from "./projectile.js";

export function GroupOfInvaders(game) {
  this.lines = 2;
  this.columns = 8;
  this.invaders = [];
  this.speed = 1;
  this.invaderWidth = 80;

  this.projectiles = [];
  this.delayToShoot = 40;
  this.frame = 0;

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
      this.speed += 1.2;
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

  this.prepareToShoot = () => {
    this.frame++;
    if (this.frame >= this.delayToShoot) {
      this.frame = 0;
      shoot();
    }
  };

  this.checkCollision = () => {
    for (let index = 0; index < this.projectiles.length; index++) {
      const projectile = this.projectiles[index];
      if (
        projectile.x > game.player.x - 20 &&
        projectile.x < game.player.x + 80 &&
        projectile.y > game.player.y - 20 &&
        projectile.y < game.player.y + 20
      ) {
        game.player.isDead = true;
      }
    }
  };

  const shoot = () => {
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
  };
}

export function Invader(game) {
  this.screenHeight = game.height;

  this.width = 50;
  this.x;
  this.y;
  this.type;
  this.isAlive = true;

  this.visualEffects = new VisualEffects();

  this.shoot = () => {
    const projectileFactory = new ProjectileFactory();
    return projectileFactory.makeProjectile(
      INVASOR,
      this.x + this.width / 1.5,
      this.y + 25
    );
  };

  this.destroy = () => {
    this.isAlive = false;
    this.visualEffects.playExplosion();
  };
}

