import { VisualEffects } from "./audio.js";
import { ProjectileFactory, STARSHIP } from "./projectile.js";

export function Player(game) {
  this.rightPressed = false;
  this.leftPressed = false;
  this.score = 0;
  this.direction = 0; // 0 to left and 1 to right
  this.nextLine = false;
  this.isDead = false;

  this.visualEffects = new VisualEffects();

  this.y = game.height - 90;
  this.x = game.width / 2;

  this.projectile = undefined;
  this.isShooting = () => this.projectile !== undefined;

  this.shoot = () => {
    if (!this.isShooting()) {
      const projectileFactory = new ProjectileFactory();
      this.visualEffects.playLaseSound();
      this.projectile = projectileFactory.makeProjectile(
        STARSHIP,
        this.x + 34,
        this.y + 41
      );
    }
  };

  this.resetProjectile = () => {
    this.projectile = undefined;
  };

  this.playerToRight = () => {
    this.x += 6;
    const maxWidth = game.width - 60;
    if (this.x >= maxWidth) {
      this.x = maxWidth;
    }
  };

  this.playerToLeft = () => {
    this.x -= 6;
    const minWidth = 60;
    if (this.x <= minWidth) {
      this.x = minWidth;
    }
  };
}

