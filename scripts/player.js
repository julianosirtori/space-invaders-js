export function Player(game) {
  this.rightPressed = false;
  this.leftPressed = false;
  this.score = 0;
  this.direction = 0; // 0 to left and 1 to right
  this.nextLine = false;
  this.idDead = false;

  this.y = game.height - 90;
  this.x = game.width / 2;

  this.projectileY = this.y;
  this.projectileX = this.x;
  this.isShooting = () => this.projectileY !== this.y;

  this.shoot = () => {
    if (!this.isShooting()) {
      this.projectileY += 41;
      this.projectileX = this.x + 34;
    }
  };

  this.hit = () => {
    this.projectileY = this.y;
    this.projectileX = this.x;
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

  this.resetProjectile = () => {
    this.projectileY = this.y;
    this.projectileX = game.player.x;
  };
}

